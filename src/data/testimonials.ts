export type Testimonial = { quote: string; name: string; role: string; company: string; link?: string };

// Real client quotes only; the section stays hidden until `site.showTestimonials` is true.
export const testimonials: Testimonial[] = [];
