import { useEffect, useState } from "react";

type LocationKey = "kent-town" | "keswick" | "thebarton";
type ImageName =
  | "about-wall.webp"
  | "board-wars.webp"
  | "coaching.webp"
  | "eight-week-challenge.webp"
  | "first-time-climber.webp"
  | "gym-floor.webp"
  | "home-hero.webp"
  | "logo-white.webp";

type OptimizedImageProps = {
  name: ImageName;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "eager" | "lazy";
};

type EventItem = {
  title: string;
  meta: string;
  image: ImageName;
  width: number;
  height: number;
  copy: string;
};

type PricePlan = {
  label: string;
  name: string;
  price: string;
  detail: string;
  bestFor: string;
  action: string;
  featured?: boolean;
};

const pricePlans: PricePlan[] = [
  {
    label: "First visit",
    name: "Beginner Starter Pack",
    price: "$59",
    detail: "Three weeks of unlimited climbing with shoe and chalk hire included.",
    bestFor: "New climbers who want shoes, chalk, and plenty of climbing time included.",
    action: "Start here",
    featured: true,
  },
  {
    label: "Casual",
    name: "Single Entry",
    price: "$24",
    detail: "One climbing session at any Adelaide Beyond Bouldering location.",
    bestFor: "After-work climbs, spontaneous sessions, and visitors keeping plans light.",
    action: "Buy casual pass",
  },
  {
    label: "Flexible",
    name: "10 Visit Pass",
    price: "$216",
    detail: "Ten entries, shared value, and a twelve month expiry window.",
    bestFor: "Students, shift workers, and friends sharing flexible entries.",
    action: "Buy visit pass",
  },
  {
    label: "Regular",
    name: "Membership",
    price: "$29/wk",
    detail: "Unlimited climbing, member pricing, and a simple direct debit flow.",
    bestFor: "Regular climbers making bouldering part of the week.",
    action: "Become a member",
  },
];

const locations: Record<
  LocationKey,
  {
    name: string;
    area: string;
    fit: string;
    travel: string;
    facilities: string[];
    address: string;
  }
> = {
  "kent-town": {
    name: "Kent Town",
    area: "CBD-adjacent",
    fit: "Best for after-work sessions and first visits from the east side of the city.",
    travel: "Quick ride from Adelaide CBD, Norwood, and university precincts.",
    address: "15 minutes from Adelaide CBD by bike or car",
    facilities: ["Beginner-friendly sets", "Rental shoes", "Coaching sessions", "Social evenings"],
  },
  keswick: {
    name: "Keswick",
    area: "Inner south-west",
    fit: "Best for climbers near Goodwood, Mile End, Richmond, and Keswick offices.",
    travel: "Easy stop before or after work for people commuting through the south-west.",
    address: "Close to Keswick Station and city fringe workplaces",
    facilities: ["Wide grade range", "Training zone", "Youth programs", "Accessible parking"],
  },
  thebarton: {
    name: "Thebarton",
    area: "West of CBD",
    fit: "Best for higher-energy training, boards, events, and progression goals.",
    travel: "Strong option for Bowden, Hindmarsh, Thebarton, and western suburbs.",
    address: "Close to tram and inner-west arterial routes",
    facilities: ["Board training", "Event nights", "Advanced climbs", "Private coaching"],
  },
};

const firstTimeSteps = [
  {
    step: "01",
    title: "Choose a simple pass",
    copy: "Start with the beginner pack, a casual pass, or a membership without digging through hidden pricing.",
  },
  {
    step: "02",
    title: "Complete the waiver",
    copy: "Sign the waiver online, confirm the safety basics, and keep check-in fast when you arrive.",
  },
  {
    step: "03",
    title: "Arrive prepared",
    copy: "Know what to wear, when to arrive, where to warm up, and how rental shoes and chalk work.",
  },
];

const safetyItems = [
  "No ropes are required; bouldering uses padded floors and controlled falling practice.",
  "Staff explain basic rules before first-time climbers begin.",
  "Rental shoes and chalk are available at every location.",
  "Start on easier colours, downclimb where possible, and keep landing zones clear.",
];

const events: EventItem[] = [
  {
    title: "Board Wars",
    meta: "Thebarton events",
    image: "board-wars.webp",
    width: 1080,
    height: 500,
    copy: "High-energy sessions for climbers who like friendly pressure and creative movement.",
  },
  {
    title: "8 Week Challenge",
    meta: "All locations",
    image: "eight-week-challenge.webp",
    width: 1800,
    height: 1200,
    copy: "Eight weeks of training, progress checks, and shared momentum across the gyms.",
  },
];

const startIdeas = [
  "bouldering for beginners in Adelaide",
  "indoor bouldering Adelaide CBD",
  "beginner climbing gym Kent Town",
  "climbing gym Keswick",
  "bouldering classes Adelaide",
  "social fitness Adelaide",
];

const imagePath = (name: ImageName) => `${import.meta.env.BASE_URL}images/${name}`;

function OptimizedImage({
  name,
  alt,
  width,
  height,
  className,
  loading = "lazy",
}: OptimizedImageProps) {
  return (
    <img
      className={className}
      src={imagePath(name)}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      onError={(event) => {
        const image = event.currentTarget;

        if (image.dataset.fallbackApplied !== "true") {
          image.dataset.fallbackApplied = "true";
          image.src = `/images/${name}`;
        }
      }}
    />
  );
}

function App() {
  const [activeLocation, setActiveLocation] = useState<LocationKey>("kent-town");
  const location = locations[activeLocation];

  useEffect(() => {
    const revealItems = document.querySelectorAll<HTMLElement>(
      ".section, .section-heading, .heading-image, .prep-panel, .split-section, .program-grid article, .event-card, .waiver-section",
    );

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    revealItems.forEach((item) => {
      item.classList.add("reveal");
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="page">
      <header className="site-header" id="home">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="top-line">
          <span>Adelaide indoor bouldering</span>
          <span>Beginner guide, clear pricing, easy waiver</span>
        </div>
        <div className="nav-shell">
          <a className="brand" href="#home" aria-label="Beyond Bouldering home">
            <OptimizedImage
              name="logo-white.webp"
              alt=""
              width={713}
              height={292}
              loading="eager"
            />
            <span>Beyond Bouldering</span>
          </a>
          <nav className="nav" aria-label="Primary navigation">
            <a href="#first-time">First Time</a>
            <a href="#pricing">Pricing</a>
            <a href="#locations">Locations</a>
            <a href="#classes">Classes</a>
            <a href="#waiver">Waiver</a>
          </nav>
          <a className="nav-cta" href="#pricing">
            Book now
          </a>
        </div>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-media">
            <OptimizedImage
              name="home-hero.webp"
              alt="Indoor bouldering wall at Beyond Bouldering Adelaide"
              width={1562}
              height={1037}
              loading="eager"
            />
          </div>
          <div className="hero-copy">
            <p className="eyebrow">Go forth. Boulder.</p>
            <h1 id="hero-title">Start climbing in Adelaide without the guesswork.</h1>
            <p>
              Big walls, bright holds, friendly staff, and everything you need for a confident
              first session at Beyond Bouldering.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="button button-primary" href="#first-time">
                First time guide
              </a>
              <a className="button button-secondary" href="#pricing">
                Compare prices
              </a>
              <a className="button button-quiet" href="#waiver">
                Complete waiver
              </a>
            </div>
          </div>
        </section>

        <section className="proof-strip" aria-label="Key visitor information">
          <div>
            <strong>3</strong>
            <span>Adelaide locations</span>
          </div>
          <div>
            <strong>15 min</strong>
            <span>Suggested first-visit buffer</span>
          </div>
          <div>
            <strong>1 view</strong>
            <span>Simple pass guide</span>
          </div>
          <div>
            <strong>Beginner</strong>
            <span>Safety guidance included</span>
          </div>
        </section>

        <section className="section intro-section" id="first-time" aria-labelledby="first-time-title">
          <div className="section-heading">
            <p className="eyebrow">First time?</p>
            <h2 id="first-time-title">A step-by-step path for new climbers.</h2>
            <p>
              Start with the basics, choose a pass that fits, finish the waiver, and walk in
              ready to climb.
            </p>
          </div>

          <div className="step-grid">
            {firstTimeSteps.map((item) => (
              <article className="step-card" key={item.step}>
                <span>{item.step}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="prep-panel">
            <div>
              <h3>What to know before you arrive</h3>
              <ul>
                {safetyItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <OptimizedImage
              name="first-time-climber.webp"
              alt="A climber on an indoor bouldering wall"
              width={1920}
              height={1078}
            />
          </div>
        </section>

        <section className="section pricing-section" id="pricing" aria-labelledby="pricing-title">
          <div className="section-heading compact with-media">
            <div className="heading-copy">
              <p className="eyebrow">Pricing</p>
              <h2 id="pricing-title">Pick your pass in seconds.</h2>
            </div>
            <OptimizedImage
              className="heading-image"
              name="gym-floor.webp"
              alt="Climbers using the indoor bouldering gym floor"
              width={1920}
              height={1078}
            />
          </div>
          <div className="price-grid">
            {pricePlans.map((plan) => (
              <article className={plan.featured ? "price-card featured" : "price-card"} key={plan.name}>
                <p className="plan-label">{plan.label}</p>
                <h3>{plan.name}</h3>
                <p className="price">{plan.price}</p>
                <p>{plan.detail}</p>
                <div className="best-for">
                  <strong>Best for</strong>
                  <span>{plan.bestFor}</span>
                </div>
                <a href="#waiver">{plan.action}</a>
              </article>
            ))}
          </div>
          <p className="decision-note">
            Recommended for Beginner: choose the Beginner Starter Pack for three weeks of climbing,
            rental shoes, chalk, and time to settle into the gym.
          </p>
        </section>

        <section className="split-section" aria-label="Beyond Bouldering first visit highlights">
          <div className="split-copy">
            <p className="eyebrow">First-visit flow</p>
            <h2>Bold walls, clear choices, and a smoother first climb.</h2>
            <div className="value-list">
              <span>Bold gym imagery</span>
              <span>Fast booking actions</span>
              <span>Easy waiver access</span>
              <span>Clear location cards</span>
            </div>
          </div>
          <OptimizedImage
            name="about-wall.webp"
            alt="Beyond Bouldering climbing wall"
            width={1920}
            height={1078}
          />
        </section>

        <section className="section location-section" id="locations" aria-labelledby="location-title">
          <div className="section-heading compact with-media">
            <div className="heading-copy">
              <p className="eyebrow">Locations</p>
              <h2 id="location-title">Choose the gym that fits your routine.</h2>
            </div>
            <OptimizedImage
              className="heading-image"
              name="about-wall.webp"
              alt="Beyond Bouldering climbing wall used to compare Adelaide locations"
              width={1920}
              height={1078}
            />
          </div>
          <div className="location-layout">
            <div className="location-tabs" role="tablist" aria-label="Beyond Bouldering locations">
              {(Object.keys(locations) as LocationKey[]).map((key) =>
                activeLocation === key ? (
                  <button
                    type="button"
                    role="tab"
                    aria-selected="true"
                    className="active"
                    key={key}
                    onClick={() => setActiveLocation(key)}
                  >
                    <span>{locations[key].name}</span>
                    <small>{locations[key].area}</small>
                  </button>
                ) : (
                  <button
                    type="button"
                    role="tab"
                    aria-selected="false"
                    className=""
                    key={key}
                    onClick={() => setActiveLocation(key)}
                  >
                    <span>{locations[key].name}</span>
                    <small>{locations[key].area}</small>
                  </button>
                ),
              )}
            </div>
            <article className="location-card">
              <div>
                <p className="eyebrow">{location.area}</p>
                <h3>{location.name}</h3>
                <p>{location.fit}</p>
              </div>
              <dl>
                <div>
                  <dt>Useful for</dt>
                  <dd>{location.travel}</dd>
                </div>
                <div>
                  <dt>Access note</dt>
                  <dd>{location.address}</dd>
                </div>
              </dl>
              <ul className="facility-list">
                {location.facilities.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section className="section classes-section" id="classes" aria-labelledby="classes-title">
          <div className="section-heading">
            <p className="eyebrow">Classes and community</p>
            <h2 id="classes-title">Climb more often with coaching and events.</h2>
          </div>
          <div className="program-grid">
            <article>
              <OptimizedImage
                name="gym-floor.webp"
                alt="Climbers training together indoors"
                width={1920}
                height={1078}
              />
              <h3>Beginner classes</h3>
              <p>Movement basics, gym etiquette, warm-ups, and confidence for new climbers.</p>
            </article>
            <article>
              <OptimizedImage
                name="coaching.webp"
                alt="Indoor bouldering coaching session"
                width={1920}
                height={1078}
              />
              <h3>Private coaching</h3>
              <p>Personal movement feedback for climbers who want a structured progression plan.</p>
            </article>
          </div>
          <div className="event-grid">
            {events.map((event) => (
              <article className="event-card" key={event.title}>
                <OptimizedImage
                  name={event.image}
                  alt={`${event.title} event poster`}
                  width={event.width}
                  height={event.height}
                />
                <div>
                  <p>{event.meta}</p>
                  <h3>{event.title}</h3>
                  <span>{event.copy}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section start-section" aria-labelledby="start-title">
          <div className="section-heading compact with-media">
            <div className="heading-copy">
              <p className="eyebrow">Find your start</p>
              <h2 id="start-title">Popular ways to begin are easy to spot.</h2>
            </div>
            <OptimizedImage
              className="heading-image"
              name="coaching.webp"
              alt="Indoor bouldering coaching session"
              width={1920}
              height={1078}
            />
          </div>
          <div className="keyword-grid">
            {startIdeas.map((keyword) => (
              <span key={keyword}>{keyword}</span>
            ))}
          </div>
          <p>
            Choose by suburb, class type, skill level, or the kind of session you want today.
          </p>
        </section>

        <section className="waiver-section" id="waiver" aria-labelledby="waiver-title">
          <div>
            <p className="eyebrow">Waiver and check-in</p>
            <h2 id="waiver-title">Finish the admin before you reach the front desk.</h2>
            <p>
              Complete your details before you visit, confirm the safety basics, and spend more
              of your first session on the wall.
            </p>
          </div>
          <form className="waiver-form" aria-label="Waiver form">
            <label htmlFor="waiver-name">
              Name
              <input
                id="waiver-name"
                name="name"
                type="text"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label htmlFor="waiver-location">
              Visit location
              <select id="waiver-location" name="location" defaultValue="Kent Town">
                <option>Kent Town</option>
                <option>Keswick</option>
                <option>Thebarton</option>
              </select>
            </label>
            <label className="check-row" htmlFor="waiver-safety">
              <input id="waiver-safety" name="safetyAcknowledgement" type="checkbox" />
              <span>I understand the beginner safety rules and landing zone guidance.</span>
            </label>
            <button type="button">Continue secure waiver</button>
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>Beyond Bouldering Adelaide</strong>
          <p>Three Adelaide gyms, beginner-friendly sessions, classes, and social events.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="#first-time">First Time</a>
          <a href="#pricing">Pricing</a>
          <a href="#locations">Locations</a>
          <a href="https://beyondbouldering.com.au/" target="_blank" rel="noopener noreferrer">
            Beyond Bouldering
          </a>
        </nav>
      </footer>
    </div>
  );
}

export default App;
