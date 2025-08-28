package com.example.travelshop.dto;

import com.example.travelshop.domain.Order;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.ArrayList;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderDto {
  private Long id;
  private String userId;
  private LocalDateTime orderedAt;
  private List<OrderItemDto> items;

  public static OrderDto from(Order o) {
    List<OrderItemDto> itemDtos = new ArrayList<>();

    try {
      if (o != null && o.getItems() != null) {
        itemDtos = o.getItems().stream()
            .map(i -> new OrderItemDto(i.getProduct().getId(), i.getProduct().getTitle(), i.getQuantity(),
                i.getProduct().getPrice()))
            .toList();
      }
    } catch (Exception e) {
      System.err.println("Error processing order items: " + e.getMessage());
      itemDtos = new ArrayList<>();
    }

    return OrderDto.builder()
        .id(o.getId())
        .userId(o.getUserId())
        .orderedAt(o.getOrderedAt())
        .items(itemDtos)
        .build();
  }
}
