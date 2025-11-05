package org.example.project3.service;

import lombok.RequiredArgsConstructor;
import org.example.project3.entity.job.reference.ExperienceYear;
import org.example.project3.repository.reference.ExperienceYearRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExperienceYearService implements IExperienceYearService {
    private final ExperienceYearRepository experienceYearRepository;

    @Override
    public List<ExperienceYear> findAll() {
        return experienceYearRepository.findAll();
    }
}
