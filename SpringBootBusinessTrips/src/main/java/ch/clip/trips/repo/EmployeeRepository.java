package ch.clip.trips.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ch.clip.trips.model.Employee;
import ch.clip.trips.model.Meeting;

public interface EmployeeRepository extends CrudRepository<Employee, Long> {
	List<Employee> findByName(String name); 
	List<Employee> findByJobTitle(String jobTitle);
	
	
}