package org.example.project3.repository.job;

import org.example.project3.entity.job.Application;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ApplicationRepository extends JpaRepository<Application,Long> {
    List<Application> findByCandidateId(Long candidateId);
    boolean existsByCandidateIdAndJobId(Long candidateId, Long jobId);

    // ApplicationRepository.java
    @Query("SELECT a.job.id FROM Application a WHERE a.candidate.id = :candidateId AND a.job.id IN :jobIds")
    List<Long> findAppliedJobIds(@Param("candidateId") Long candidateId, @Param("jobIds") List<Long> jobIds);

    Page<Application> findByCandidateId(Long candidateId, Pageable pageable);
}
