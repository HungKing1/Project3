package org.example.project3.repository.reference;

import org.example.project3.entity.job.reference.District;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DistrictRepository extends JpaRepository<District, Long> {
    List<District> findByCity_Id(Long cityId);
}
