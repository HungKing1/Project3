package org.example.project3.repository.reference;

import org.example.project3.entity.job.reference.WorkType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkTypeRepository extends JpaRepository<WorkType, Long> {
}
