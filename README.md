# Alba Development

Marketing site for Alba Development, positioned around business outcomes rather than technical capability alone.

## Positioning

The site should lead with the outcomes buyers want:

- Increase bookings, enquiries, or revenue.
- Reduce manual admin and operational friction.
- Improve reporting and decision-making.
- Validate and launch new digital products faster.

Technical capability is supporting proof, not the headline promise.

## Primary audience

- Business owners who want growth, efficiency, or better visibility.
- Startup founders who need to validate or launch a product.
- Buyers who may not know the exact software they need, but do know the commercial problem they want to solve.

## Page roles

- Home: communicate the business value proposition quickly, establish trust, and drive qualified enquiries.
- Services: explain the main outcome categories and help buyers understand the right next step.
- Portfolio: act as proof, showing problems solved and likely business impact rather than only screenshots or features.
- Contact: capture business goal, current bottleneck, and useful context for qualification.

## Content model

When editing key sections, keep this order in mind:

1. Outcome
2. Mechanism
3. Proof
4. Call to action

Examples:

- Say "increase bookings" before "custom booking platform".
- Say "cut manual admin" before "internal tool".
- Say "better operational visibility" before "analytics dashboard".

## Proof rules

- Prefer business impact framing over technical feature lists.
- Use directional outcomes when precise metrics are unavailable.
- Do not publish testimonials until real client quotes are available.

## Metadata and prerendering

- Default metadata lives in [index.html](./index.html).
- Route-level metadata is updated during prerendering in [scripts/prerender.js](./scripts/prerender.js).
- Visible FAQ content and FAQ structured data must stay aligned.
- If positioning changes, update on-page copy, metadata, and the social share image text together.

## Commands

```bash
npm run dev
npm run build
npm run lint
```