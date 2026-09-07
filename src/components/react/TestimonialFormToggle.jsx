import { useState } from 'react';
import TestimonialForm from './TestimonialForm';

export default function TestimonialFormToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="testimonial-toggle">
      {!isOpen ? (
        <button
          type="button"
          className="btn btn-primary testimonial-toggle-btn"
          onClick={() => setIsOpen(true)}
        >
          Partager votre expérience
        </button>
      ) : (
        <div className="testimonial-form-wrapper">
          <h3 className="testimonial-form-title">Partagez votre expérience</h3>
          <TestimonialForm />
          <button
            type="button"
            className="btn btn-outline-white testimonial-close-btn"
            onClick={() => setIsOpen(false)}
          >
            Fermer
          </button>
        </div>
      )}
    </div>
  );
}
