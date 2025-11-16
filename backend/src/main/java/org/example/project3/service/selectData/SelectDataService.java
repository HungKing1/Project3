package org.example.project3.service.selectData;

import lombok.RequiredArgsConstructor;
import org.example.project3.entity.job.reference.District;
import org.example.project3.entity.job.reference.Ward;
import org.example.project3.repository.reference.DistrictRepository;
import org.example.project3.repository.reference.WardRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SelectDataService implements ISelectDataService{
    private final DistrictRepository districtRepository;
    private final WardRepository wardRepository;

    @Override
    public List<District> findDistrictsByCityId(Long cityId) {
        return districtRepository.findByCity_Id(cityId);
    }

    @Override
    public List<Ward> findWardsByCityId(Long cityId) {
        return wardRepository.findByCity_Id(cityId);
    }

    @Override
    public List<District> findAll() {
        return districtRepository.findAll();
    }
}
