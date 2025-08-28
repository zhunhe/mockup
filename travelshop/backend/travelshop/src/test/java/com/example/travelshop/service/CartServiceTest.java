package com.example.travelshop.service;

import com.example.travelshop.domain.Cart;
import com.example.travelshop.domain.Order;
import com.example.travelshop.domain.TravelProduct;
import com.example.travelshop.dto.OrderDto;
import com.example.travelshop.repository.CartRepository;
import com.example.travelshop.repository.OrderRepository;
import com.example.travelshop.repository.TravelProductRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.BDDMockito.argThat;
import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class CartServiceTest {

  @Mock
  private CartRepository cartRepo;

  @Mock
  private TravelProductRepository prodRepo;

  @Mock
  private OrderRepository orderRepo;

  @InjectMocks
  private CartService svc;

  @Test
  void addToCart_createsNewCartAndAddsItem() {
    // save() 호출 시 전달된 Cart 객체를 그대로 반환하도록 stub
    given(cartRepo.save(any(Cart.class)))
        .willAnswer(invocation -> invocation.getArgument(0));

    // 기존에 장바구니가 없을 때
    given(cartRepo.findByUserId("u1")).willReturn(Optional.empty());

    // 상품 mock 생성
    TravelProduct p = TravelProduct.builder()
        .id(1L)
        .title("T")
        .price(100)
        .build();
    given(prodRepo.findById(1L)).willReturn(Optional.of(p));

    // 실제 테스트 실행
    svc.addToCart("u1", 1L, 2);

    // 저장된 Cart 검증: userId가 "u1"이고, 아이템 개수가 1개
    then(cartRepo).should().save(argThat(c -> c.getUserId().equals("u1") && c.getItems().size() == 1));
  }

  @Test
  void directOrder_createsOrderWithProducts() {
    // Given
    Map<String, Object> orderData = new HashMap<>();
    Map<String, Object> products = new HashMap<>();
    products.put("서울 야경 투어", 2);
    products.put("제주 올레길 트레킹", 1);
    orderData.put("products", products);
    orderData.put("options", new HashMap<>());

    Map<String, Object> totals = new HashMap<>();
    totals.put("products", 220000);
    totals.put("options", 0);
    totals.put("total", 220000);
    orderData.put("totals", totals);

    TravelProduct product1 = TravelProduct.builder()
        .id(1L)
        .title("서울 야경 투어")
        .price(50000)
        .build();

    TravelProduct product2 = TravelProduct.builder()
        .id(2L)
        .title("제주 올레길 트레킹")
        .price(120000)
        .build();

    given(prodRepo.findByTitle("서울 야경 투어")).willReturn(Optional.of(product1));
    given(prodRepo.findByTitle("제주 올레길 트레킹")).willReturn(Optional.of(product2));
    given(orderRepo.save(any(Order.class)))
        .willAnswer(invocation -> invocation.getArgument(0));

    // When
    OrderDto result = svc.directOrder(orderData);

    // Then
    assertNotNull(result);
    assertNotNull(result.getItems());
    assertEquals(2, result.getItems().size());
    then(orderRepo).should().save(argThat(order -> order.getItems().size() == 2 &&
        order.getUserId() != null));
  }

  @Test
  void getAllOrders_returnsOrderList() {
    // Given
    TravelProduct product = TravelProduct.builder()
        .id(1L)
        .title("서울 야경 투어")
        .price(50000)
        .build();

    Order order1 = Order.builder()
        .id(1L)
        .userId("user1")
        .orderedAt(LocalDateTime.now())
        .build();
    order1.addItem(product, 2);

    Order order2 = Order.builder()
        .id(2L)
        .userId("user2")
        .orderedAt(LocalDateTime.now())
        .build();
    order2.addItem(product, 1);

    given(orderRepo.findAll()).willReturn(List.of(order1, order2));

    // When
    List<OrderDto> result = svc.getAllOrders();

    // Then
    assertNotNull(result);
    assertEquals(2, result.size());
    assertEquals(1L, result.get(0).getId());
    assertEquals(2L, result.get(1).getId());
    then(orderRepo).should().findAll();
  }

  @Test
  void directOrder_withEmptyProducts_createsEmptyOrder() {
    // Given
    Map<String, Object> orderData = new HashMap<>();
    orderData.put("products", new HashMap<>());
    orderData.put("options", new HashMap<>());

    Map<String, Object> totals = new HashMap<>();
    totals.put("products", 0);
    totals.put("options", 0);
    totals.put("total", 0);
    orderData.put("totals", totals);

    given(orderRepo.save(any(Order.class)))
        .willAnswer(invocation -> invocation.getArgument(0));

    // When
    OrderDto result = svc.directOrder(orderData);

    // Then
    assertNotNull(result);
    assertNotNull(result.getItems());
    assertEquals(0, result.getItems().size());
    then(orderRepo).should().save(argThat(order -> order.getItems().isEmpty()));
  }
}
