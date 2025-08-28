package com.example.travelshop.repository;

import com.example.travelshop.domain.TravelProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TravelProductRepository extends JpaRepository<TravelProduct, Long> {
  List<TravelProduct> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
      String title, String description);

  Optional<TravelProduct> findByTitle(String title);
}
