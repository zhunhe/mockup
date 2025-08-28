package com.example.travelshop.domain;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String userId;
  private LocalDateTime orderedAt;
  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinColumn(name = "order_id")
  @Builder.Default
  private List<OrderItem> items = new ArrayList<>();

  public void addItem(TravelProduct product, int quantity) {
    if (items == null) {
      items = new ArrayList<>();
    }
    items.add(new OrderItem(null, product, quantity));
  }

  public static Order fromCart(Cart cart) {
    List<OrderItem> orderItems = cart.getItems().stream()
        .map(i -> new OrderItem(null, i.getProduct(), i.getQuantity()))
        .toList();
    return Order.builder()
        .userId(cart.getUserId())
        .orderedAt(LocalDateTime.now())
        .items(orderItems)
        .build();
  }
}
