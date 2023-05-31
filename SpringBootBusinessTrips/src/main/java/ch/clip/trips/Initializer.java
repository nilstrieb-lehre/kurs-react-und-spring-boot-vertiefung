package ch.clip.trips;

import java.math.BigDecimal;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import ch.clip.trips.repo.MeetingRepository;

@Component
public class Initializer implements CommandLineRunner {
	private static final Logger log = LoggerFactory.getLogger(Initializer.class);

	private final MeetingRepository cartRepository;

	public Initializer(MeetingRepository cartRepository) {
		this.cartRepository = cartRepository;
	}

	public void run(String... args) throws Exception {
//		// save a couple of products
//		cartRepository.save(new CartItem(1L, "Office Chair USM", new BigDecimal("55.90"), 24));
//		cartRepository.save(new CartItem(6L, "Fender Telecaster", new BigDecimal("10099.00"), 3));
//
//		// fetch all products
//		log.info("Cart Items found with findAll()");
//		log.info("----------------------------");
//		for (CartItem item : cartRepository.findAll()) {
//			log.info(item.toString());
//		}
//		log.info("end findAll()");
//		// fetch an individual product by Id
//		cartRepository.findById(1L).ifPresent(item -> {
//			log.info("Cart Item find with findById(1L)");
//			log.info("------------------------------");
//			log.info(item.toString());
//			log.info("");
//		});
//		// fetch products by name
//		log.info("Cart Item found by Name ('Couch Sofia')");
//		log.info("-------------------------------------");
//		cartRepository.findByName("Couch Sofia").forEach(couch -> {
//			log.info(couch.toString());
//		});
//					for (CartItem couch : cartRepository.findByName("Couch Sofia")) {
//						log.info(couch.toString());
//					}
//		log.info("");

	}

}
