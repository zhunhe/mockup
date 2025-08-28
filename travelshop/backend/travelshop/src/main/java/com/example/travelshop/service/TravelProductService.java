package com.example.travelshop.service;

import com.example.travelshop.domain.TravelProduct;
import com.example.travelshop.dto.CreateTravelProductRequestDto;
import com.example.travelshop.dto.TravelProductDto;
import com.example.travelshop.exception.NotFoundException;
import com.example.travelshop.repository.TravelProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TravelProductService {
  private final TravelProductRepository repo;

  /**
   * 전체 조회 또는 키워드(q)가 있으면 제목/설명 검색
   */
  public List<TravelProductDto> findAll(Optional<String> q) {
    List<TravelProduct> products;
    if (q.isPresent() && !q.get().isBlank()) {
      String kw = q.get();
      products = repo.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(kw, kw);
    } else {
      products = repo.findAll();
    }

    return products.stream()
        .map(TravelProductDto::from)
        .collect(Collectors.toList());
  }

  /**
   * ID로 단건 조회
   */
  public TravelProductDto getById(Long id) {
    return repo.findById(id)
        .map(TravelProductDto::from)
        .orElseThrow(() -> new NotFoundException("상품을 찾을 수 없습니다. id=" + id));
  }

  /**
   * 상품 등록
   */
  public TravelProductDto create(CreateTravelProductRequestDto req) {
    TravelProduct p = TravelProduct.builder()
        .title(req.getTitle())
        .category(req.getCategory())
        .description(req.getDescription())
        .price(req.getPrice())
        .availableFrom(req.getAvailableFrom())
        .availableTo(req.getAvailableTo())
        .build();
    TravelProduct saved = repo.save(p);
    return TravelProductDto.from(saved);
  }
}
