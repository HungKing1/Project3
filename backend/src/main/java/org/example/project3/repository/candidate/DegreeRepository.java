package org.example.project3.repository.candidate;

import org.example.project3.entity.candidate.Degree;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DegreeRepository extends JpaRepository<Degree, Long>
{
}
