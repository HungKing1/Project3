package org.example.project3.repository.candidate;

import org.example.project3.entity.candidate.DesiredJob;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DesiredJobRepository extends JpaRepository<DesiredJob, Long> {
}
