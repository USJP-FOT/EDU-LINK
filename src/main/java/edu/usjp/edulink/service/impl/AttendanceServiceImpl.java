package edu.usjp.edulink.service.impl;

import edu.usjp.edulink.dto.Attendance;
import edu.usjp.edulink.entity.AttendanceEntity;
import edu.usjp.edulink.entity.StudentEntity;
import edu.usjp.edulink.repository.AttendanceRepository;
import edu.usjp.edulink.repository.StudentRepository;
import edu.usjp.edulink.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceServiceImpl implements AttendanceService {
    private final AttendanceRepository attendanceRepository;
    private final StudentRepository studentRepository;
    private final ModelMapper modelMapper;


    @Override
    public void markAttendant(Attendance attendance) {
        if (studentRepository.existsById(attendance.getStudentId())) {
            attendanceRepository.save(modelMapper.map(attendance, AttendanceEntity.class));
        }
    }

    @Override
    public List<Attendance> getAll() {
        List<Attendance> attendanceList = new ArrayList<>();
        List<AttendanceEntity> attendanceEntities = attendanceRepository.findAll();

        attendanceEntities.forEach(attendanceEntity -> {
            attendanceList.add(modelMapper.map(attendanceEntity, Attendance.class));
        });

        attendanceList.forEach(attendance -> {
            attendance.setStudentName(studentRepository.findStudentEntityById(attendance.getStudentId()).getName());
        });
        return attendanceList;
    }
}
