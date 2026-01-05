package org.example.project3.repository.candidate;

import org.example.project3.entity.candidate.Candidate;
import org.example.project3.entity.candidate.Message;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByCandidateOrderByCreatedAtAsc(Candidate candidate);
}
