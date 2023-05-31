package ch.clip.trips.repo;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import ch.clip.trips.model.Flight;
import ch.clip.trips.model.Meeting;

public interface FlightRepository extends CrudRepository<Flight, Long> {
	List<Meeting> findByNumber(Long number); 
	List<Meeting> findByCityFrom(String cityFrom);
	List<Meeting> findByCityTo(String cityTo);
}