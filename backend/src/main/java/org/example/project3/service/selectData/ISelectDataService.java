package org.example.project3.service.selectData;

import org.example.project3.entity.job.reference.City;
import org.example.project3.entity.job.reference.District;
import org.example.project3.entity.job.reference.Ward;

import java.util.List;

public interface ISelectDataService {
    List<District> findDistrictsByCityId(Long cityId);
    List<Ward> findWardsByCityId(Long cityId);
    List<District> findAll();
}
