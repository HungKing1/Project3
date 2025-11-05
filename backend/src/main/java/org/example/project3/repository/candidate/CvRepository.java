package org.example.project3.repository.candidate;

import org.example.project3.entity.candidate.Cv;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CvRepository extends JpaRepository<Cv, Long> {
}
