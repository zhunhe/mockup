package com.example.travelshop.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItemDto {
  private Long productId;
  private String title;
  private int quantity;
  private int price;
}