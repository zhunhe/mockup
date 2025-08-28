package com.example.travelshop.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.AllArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "carts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cart {
  private String userId;
  @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<CartItem> items = new ArrayList<>();
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  public Cart(String userId) {
    this.userId = userId;
  }

  public void addItem(TravelProduct p, int qty) {
    for (CartItem i : items) {
      if (i.getProduct().getId().equals(p.getId())) {
        i.setQuantity(i.getQuantity() + qty);
        return;
      }
    }
    items.add(new CartItem(this, p, qty));
  }

  public void clear() {
    items.clear();
  }
}