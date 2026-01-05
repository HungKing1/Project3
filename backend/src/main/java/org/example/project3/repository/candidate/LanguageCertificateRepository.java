package org.example.project3.repository.candidate;

import org.example.project3.entity.candidate.Candidate;
import org.example.project3.entity.candidate.LanguageCertificate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LanguageCertificateRepository extends JpaRepository<LanguageCertificate, Long>
{
    List<LanguageCertificate> findByCandidate(Candidate candidate);
}
