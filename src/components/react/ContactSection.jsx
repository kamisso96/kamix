import { useState } from 'react';
import { siteConfig } from '../../config';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // 'loading' | 'success' | 'error'

  const endpoint = siteConfig.contact.formspreeEndpoint;

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
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Veuillez saisir une adresse email valide.';
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      newErrors.phone = 'Veuillez saisir un numéro de téléphone valide.';
    }
    if (!formData.service) {
      newErrors.service = 'Veuillez sélectionner un service.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères.';
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
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', service: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="form-name">Nom complet *</label>
          <input
            type="text"
            id="form-name"
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
          <label htmlFor="form-email">Email *</label>
          <input
            type="email"
            id="form-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="votre@email.com"
            autoComplete="email"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="form-phone">Téléphone *</label>
          <input
            type="tel"
            id="form-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            minLength="8"
            maxLength="20"
            placeholder="+33 6 12 34 56 78"
            autoComplete="tel"
            className={errors.phone ? 'error' : ''}
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="form-service">Service souhaité *</label>
          <select
            id="form-service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className={errors.service ? 'error' : ''}
          >
            <option value="" disabled>Sélectionnez un service</option>
            <option value="business">China Business Consulting</option>
            <option value="sourcing">Sourcing & Procurement</option>
            <option value="trade">International Trade & Logistics</option>
            <option value="education">Education Consulting</option>
            <option value="scholarship">China Scholarship & Admission</option>
            <option value="other">Autre demande</option>
          </select>
          {errors.service && <span className="form-error">{errors.service}</span>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="form-message">Message *</label>
        <textarea
          id="form-message"
          name="message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
          minLength="10"
          maxLength="2000"
          placeholder="Décrivez votre projet ou votre demande..."
          className={errors.message ? 'error' : ''}
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      {status === 'loading' && <div className="form-status loading">Envoi en cours...</div>}
      {status === 'success' && <div className="form-status success">✅ Votre message a été envoyé avec succès.</div>}
      {status === 'error' && <div className="form-status error">❌ Une erreur est survenue. Veuillez réessayer.</div>}

      <button
        type="submit"
        className="btn btn-hero btn-hero-primary form-submit"
        disabled={status === 'loading'}
      >
        Envoyer le message
      </button>
    </form>
  );
}