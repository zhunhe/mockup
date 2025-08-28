package com.example.travelshop.controller;

import com.example.travelshop.dto.CreateTravelProductRequestDto;
import com.example.travelshop.dto.TravelProductDto;
import com.example.travelshop.service.TravelProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
class TravelProductControllerTest {

  @Mock
  private TravelProductService travelProductService;

  @InjectMocks
  private TravelProductController travelProductController;

  private MockMvc mockMvc;
  private ObjectMapper objectMapper = new ObjectMapper().registerModule(new JavaTimeModule());

  @org.junit.jupiter.api.BeforeEach
  void setUp() {
    mockMvc = MockMvcBuilders.standaloneSetup(travelProductController).build();
  }

  @Test
  void getAllProducts_shouldReturnProductList() throws Exception {
    // Given
    TravelProductDto product1 = TravelProductDto.builder()
        .id(1L)
        .title("서울 야경 투어")
        .category("국내")
        .description("한강 유람선과 남산타워 야경 투어")
        .price(50000)
        .availableFrom(LocalDate.of(2025, 8, 1))
        .availableTo(LocalDate.of(2025, 12, 31))
        .build();

    TravelProductDto product2 = TravelProductDto.builder()
        .id(2L)
        .title("제주 올레길 트레킹")
        .category("국내")
        .description("제주 올레길 7코스 전 구간 완주")
        .price(120000)
        .availableFrom(LocalDate.of(2025, 9, 1))
        .availableTo(LocalDate.of(2025, 11, 30))
        .build();

    List<TravelProductDto> products = Arrays.asList(product1, product2);
    when(travelProductService.findAll(Optional.empty())).thenReturn(products);

    // When & Then
    mockMvc.perform(get("/api/products"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$[0].id").value(1))
        .andExpect(jsonPath("$[0].title").value("서울 야경 투어"))
        .andExpect(jsonPath("$[0].price").value(50000))
        .andExpect(jsonPath("$[1].id").value(2))
        .andExpect(jsonPath("$[1].title").value("제주 올레길 트레킹"))
        .andExpect(jsonPath("$[1].price").value(120000));
  }

  @Test
  void createProduct_shouldReturnCreatedProduct() throws Exception {
    // Given
    CreateTravelProductRequestDto requestDto = CreateTravelProductRequestDto.builder()
        .title("도쿄 디즈니 원데이")
        .category("해외")
        .description("도쿄 디즈니 리조트 1일 입장권")
        .price(90000)
        .availableFrom(LocalDate.of(2025, 10, 1))
        .availableTo(LocalDate.of(2026, 3, 31))
        .build();

    TravelProductDto savedProduct = TravelProductDto.builder()
        .id(3L)
        .title("도쿄 디즈니 원데이")
        .category("해외")
        .description("도쿄 디즈니 리조트 1일 입장권")
        .price(90000)
        .availableFrom(LocalDate.of(2025, 10, 1))
        .availableTo(LocalDate.of(2026, 3, 31))
        .build();

    when(travelProductService.create(any())).thenReturn(savedProduct);

    // When & Then
    mockMvc.perform(post("/api/products")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(requestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(3))
        .andExpect(jsonPath("$.title").value("도쿄 디즈니 원데이"))
        .andExpect(jsonPath("$.category").value("해외"))
        .andExpect(jsonPath("$.price").value(90000));
  }

  @Test
  void createProduct_withInvalidData_shouldReturnBadRequest() throws Exception {
    // Given
    CreateTravelProductRequestDto invalidRequest = CreateTravelProductRequestDto.builder()
        .title("") // 빈 제목
        .price(-1000) // 음수 가격
        .build();

    // When & Then
    mockMvc.perform(post("/api/products")
        .contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(invalidRequest)))
        .andExpect(status().isBadRequest());
  }
}
