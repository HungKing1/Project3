package org.example.project3.repository.candidate;

import org.example.project3.entity.candidate.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    Optional<Candidate> findByEmail(String email);
    Optional<Candidate> findByPhone(String phone);

    @Query("SELECT c FROM Candidate c LEFT JOIN FETCH c.applications WHERE c.email = :email")
    Optional<Candidate> findByEmailWithApplications(@Param("email") String email);
}
