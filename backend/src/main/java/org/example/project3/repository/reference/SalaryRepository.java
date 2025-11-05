package org.example.project3.repository.reference;

import org.example.project3.entity.job.reference.Salary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SalaryRepository extends JpaRepository<Salary, Long> {
}
