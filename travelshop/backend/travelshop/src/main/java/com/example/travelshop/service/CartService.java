package com.example.travelshop.service;

import com.example.travelshop.domain.Cart;
import com.example.travelshop.domain.Order;
import com.example.travelshop.domain.TravelProduct;
import com.example.travelshop.dto.CartDto;
import com.example.travelshop.dto.CartItemDto;
import com.example.travelshop.dto.OrderDto;
import com.example.travelshop.exception.BadRequestException;
import com.example.travelshop.exception.NotFoundException;
import com.example.travelshop.repository.CartRepository;
import com.example.travelshop.repository.OrderRepository;
import com.example.travelshop.repository.TravelProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.ArrayList;

@Service
@RequiredArgsConstructor
public class CartService {
  private final CartRepository cartRepo;
  private final TravelProductRepository prodRepo;
  private final OrderRepository orderRepo;

  @Transactional
  public CartDto addToCart(String userId, Long productId, int qty) {
    Cart cart = cartRepo.findByUserId(userId)
        .orElseGet(() -> new Cart(userId));
    TravelProduct prod = prodRepo.findById(productId)
        .orElseThrow(() -> new NotFoundException("상품 없음"));
    cart.addItem(prod, qty);
    cart = cartRepo.save(cart);
    return CartDto.builder()
        .id(cart.getId())
        .userId(cart.getUserId())
        .items(cart.getItems().stream()
            .map(i -> CartItemDto.builder()
                .productId(i.getProduct().getId())
                .title(i.getProduct().getTitle())
                .quantity(i.getQuantity())
                .price(i.getProduct().getPrice())
                .build())
            .collect(Collectors.toList()))
        .build();
  }

  @Transactional
  public OrderDto order(String userId) {
    Cart cart = cartRepo.findByUserId(userId)
        .orElseThrow(() -> new BadRequestException("장바구니가 비어 있습니다."));
    Order order = Order.fromCart(cart);
    order = orderRepo.save(order);
    cart.clear();
    cartRepo.save(cart);
    return OrderDto.from(order);
  }

  @Transactional
  public OrderDto directOrder(Map<String, Object> orderData) {
    // 프론트엔드에서 보내는 주문 데이터를 처리
    String userId = "user-" + System.currentTimeMillis(); // 임시 사용자 ID 생성

    // 주문 생성
    Order order = new Order();
    order.setUserId(userId);
    order.setOrderedAt(java.time.LocalDateTime.now());
    order.setItems(new ArrayList<>());

    System.out.println("Order created with items: " + order.getItems());

    // 상품 정보 처리
    if (orderData.containsKey("products")) {
      @SuppressWarnings("unchecked")
      Map<String, Object> products = (Map<String, Object>) orderData.get("products");

      System.out.println("Processing products: " + products);

      for (Map.Entry<String, Object> entry : products.entrySet()) {
        String productTitle = entry.getKey();
        Object quantityObj = entry.getValue();
        Integer quantity;

        // quantity가 Number인 경우 처리
        if (quantityObj instanceof Number) {
          quantity = ((Number) quantityObj).intValue();
        } else {
          quantity = Integer.parseInt(quantityObj.toString());
        }

        if (quantity > 0) {
          // 상품 제목으로 상품 찾기
          TravelProduct product = prodRepo.findByTitle(productTitle)
              .orElseThrow(() -> new NotFoundException(
                  "상품을 찾을 수 없습니다: " + productTitle));

          // 주문 아이템 생성
          order.addItem(product, quantity);
          System.out.println("Added item: " + productTitle + " x " + quantity);
        }
      }
    }

    System.out.println("Order before save: " + order.getItems());
    order = orderRepo.save(order);
    System.out.println("Order after save: " + order.getItems());

    // 저장된 Order를 다시 조회
    Order savedOrder = orderRepo.findById(order.getId()).orElse(order);
    System.out.println("Retrieved order: " + savedOrder.getItems());

    return OrderDto.from(savedOrder);
  }

  public List<OrderDto> getAllOrders() {
    return orderRepo.findAll().stream()
        .map(OrderDto::from)
        .collect(Collectors.toList());
  }
}
