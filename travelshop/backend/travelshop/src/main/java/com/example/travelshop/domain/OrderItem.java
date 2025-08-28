package com.example.travelshop.domain;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "order_items")
public class OrderItem {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "product_id")
  private TravelProduct product;
  private int quantity;

  public OrderItem(Long id, TravelProduct product, int quantity) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
  }
}
