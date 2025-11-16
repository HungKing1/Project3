package org.example.project3.controller;

import lombok.RequiredArgsConstructor;
import org.example.project3.response.ApiResponse;
import org.example.project3.service.selectData.ISelectDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/public")
public class SelectDataController {
    private final ISelectDataService selectDataService;

    @GetMapping("/districts")
    public ResponseEntity<ApiResponse> findDistrictsByCityId(@RequestParam("city_id") Long cityId) {
        List<Map<String, Object>> districtList = selectDataService.findDistrictsByCityId(cityId).stream()
                .map(d -> Map.<String, Object>of(
                        "name", d.getName(),
                        "id", d.getId()
                )).toList();
        return ResponseEntity.ok(new ApiResponse(true, "Lấy danh sách quận thành công" , districtList));
    }

    @GetMapping("/wards")
    public ResponseEntity<ApiResponse> findWardsByCityId(@RequestParam("city_id") Long cityId) {
        List<Map<String, Object>> wardList = selectDataService.findWardsByCityId(cityId).stream()
                .map(d -> Map.<String, Object>of(
                        "name", d.getName(),
                        "id", d.getId()
                )).toList();
        return  ResponseEntity.ok(new ApiResponse(true, "Lấy danh sách phường thành công" ,wardList));
    }
}
