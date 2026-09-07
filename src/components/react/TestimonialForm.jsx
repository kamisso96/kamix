import { useState } from 'react';
import { siteConfig } from '../../config';

export default function TestimonialForm() {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    quote: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  const endpoint = siteConfig.contact.testimonialEndpoint;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = 'Le nom est requis (minimum 2 caractères).';
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Votre rôle ou entreprise est requis.';
    }
    if (!formData.quote.trim() || formData.quote.trim().length < 10) {
      newErrors.quote = 'Le témoignage doit contenir au moins 10 caractères.';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', role: '', quote: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <form className="testimonial-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="testimonial-name">Nom complet *</label>
        <input
          type="text"
          id="testimonial-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          minLength="2"
          maxLength="100"
          placeholder="Votre nom"
          autoComplete="name"
          className={errors.name ? 'error' : ''}
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="testimonial-role">Rôle / Entreprise *</label>
        <input
          type="text"
          id="testimonial-role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          maxLength="100"
          placeholder="Ex: Directeur, Société ABC"
          className={errors.role ? 'error' : ''}
        />
        {errors.role && <span className="form-error">{errors.role}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="testimonial-quote">Votre témoignage *</label>
        <textarea
          id="testimonial-quote"
          name="quote"
          rows="5"
          value={formData.quote}
          onChange={handleChange}
          required
          minLength="10"
          maxLength="2000"
          placeholder="Partagez votre expérience avec KAMIX Consulting..."
          className={errors.quote ? 'error' : ''}
        />
        {errors.quote && <span className="form-error">{errors.quote}</span>}
      </div>

      {status === 'loading' && <div className="form-status loading">Envoi en cours...</div>}
      {status === 'success' && <div className="form-status success">✅ Merci ! Votre témoignage a bien été envoyé.</div>}
      {status === 'error' && <div className="form-status error">❌ Une erreur est survenue. Veuillez réessayer.</div>}

      <button type="submit" className="btn btn-primary form-submit">
        Envoyer mon témoignage
      </button>
    </form>
  );
}
