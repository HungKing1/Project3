package org.example.project3.repository.reference;

import org.example.project3.entity.job.reference.City;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CityRepository extends JpaRepository<City, Long> {
}
