package org.example.project3.repository.candidate;

import org.example.project3.entity.candidate.Candidate;
import org.example.project3.entity.candidate.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long>
{
    List<Experience> findByCandidate(Candidate candidate);
}
