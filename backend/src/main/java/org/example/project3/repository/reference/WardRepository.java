package org.example.project3.repository.reference;

import org.example.project3.entity.job.reference.Ward;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WardRepository extends JpaRepository<Ward, Long> {
    List<Ward> findByCity_Id(Long cityId);
}
