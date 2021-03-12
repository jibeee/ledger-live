// @flow
import timemachine from "timemachine";
import {
  filterAnnouncements,
  localizeAnnouncements,
} from "../../announcements/AnnouncementProvider/logic";
import api from "../../announcements/AnnouncementProvider/api/api.mock";

timemachine.config({
  dateString: "February 22, 2021 13:12:59",
});

let rawAnnouncements;
let announcements;
describe("filterAnnouncements", () => {
  beforeEach(async () => {
    rawAnnouncements = await api.fetchAnnouncements();
  });

  afterAll(() => {
    timemachine.reset();
  });

  describe("language filters", () => {
    describe("with context.language = 'en'", () => {
      const context = {
        language: "en",
        currencies: ["bitcoin", "cosmos"],
        getDate: () => new Date(),
      };

      beforeEach(() => {
        announcements = localizeAnnouncements(rawAnnouncements, context);
      });
      it("should return all anouncements for english only and all the non-scoped one", async () => {
        const filtered = filterAnnouncements(announcements, context);

        expect(filtered).toStrictEqual(announcements);
      });
    });
    describe("with context.language = 'fr'", () => {
      const context = {
        language: "fr",
        currencies: ["bitcoin", "cosmos"],
        getDate: () => new Date(),
      };

      beforeEach(() => {
        announcements = localizeAnnouncements(rawAnnouncements, context);
      });

      it("should return all anouncements for french only and all the non-scoped one", async () => {
        const filtered = filterAnnouncements(announcements, context);
        const expected = [
          {
            uuid: "announcement-id-a",
            level: "info",
            icon: "warning",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            published_at: "2019-09-29T00:00:00.000Z",
            expired_at: "2021-03-06T00:00:00.000Z",
            utm_campaign: "promo_feb2021",
            currencies: ["cosmos"],
          },
          {
            uuid: "announcement-id-c",
            level: "warning",
            icon: "warning",
            content: {
              title: "Fork bitcoin en approche",
              text:
                "Lorem ipsum mais en français dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/fork-bitcoin-en-approche",
                label: "Clique ici pour en savoir plus sur le fork bitcoin ;)",
              },
            },
            priority: 1,
            contextual: ["send"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-05-06T00:00:00.000Z",
            currencies: ["bitcoin"],
          },
        ];

        expect(filtered).toStrictEqual(expected);
      });
    });
  });

  describe("currencies filters", () => {
    describe("with context.currencies = ['bitcoin']", () => {
      const context = {
        language: "en",
        currencies: ["bitcoin"],
        getDate: () => new Date(),
      };

      beforeEach(() => {
        announcements = localizeAnnouncements(rawAnnouncements, context);
      });

      it("should return only the announcements scoped to bitcoin", () => {
        const filtered = filterAnnouncements(announcements, context);
        const expected = [
          {
            uuid: "announcement-id-b",
            level: "info",
            icon: "info",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            languages: ["en"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-04-06T00:00:00.000Z",
          },
          {
            uuid: "announcement-id-c",
            level: "warning",
            icon: "warning",
            content: {
              title: "Incoming bitcoin fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            priority: 1,
            contextual: ["send"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-05-06T00:00:00.000Z",
            currencies: ["bitcoin"],
          },
        ];

        expect(filtered).toStrictEqual(expected);
      });
    });
    describe("with context.currencies = ['cosmos']", () => {
      const context = {
        language: "en",
        currencies: ["cosmos"],
        getDate: () => new Date(),
      };

      beforeEach(() => {
        announcements = localizeAnnouncements(rawAnnouncements, context);
      });

      it("should return only the announcements scoped to cosmos", () => {
        const filtered = filterAnnouncements(announcements, context);
        const expected = [
          {
            uuid: "announcement-id-a",
            level: "info",
            icon: "warning",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            published_at: "2019-09-29T00:00:00.000Z",
            expired_at: "2021-03-06T00:00:00.000Z",
            utm_campaign: "promo_feb2021",
            currencies: ["cosmos"],
          },
          {
            uuid: "announcement-id-b",
            level: "info",
            icon: "info",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            languages: ["en"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-04-06T00:00:00.000Z",
          },
        ];

        expect(filtered).toStrictEqual(expected);
      });
    });
    describe("with context.currencies = ['bitcoin', 'cosmos']", () => {
      const context = {
        language: "en",
        currencies: ["bitcoin", "cosmos"],
        getDate: () => new Date(),
      };

      beforeEach(() => {
        announcements = localizeAnnouncements(rawAnnouncements, context);
      });

      it("should return only the announcements scoped to cosmos and bitcoin", () => {
        const filtered = filterAnnouncements(announcements, context);
        const expected = [
          {
            uuid: "announcement-id-a",
            level: "info",
            icon: "warning",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            published_at: "2019-09-29T00:00:00.000Z",
            expired_at: "2021-03-06T00:00:00.000Z",
            utm_campaign: "promo_feb2021",
            currencies: ["cosmos"],
          },
          {
            uuid: "announcement-id-b",
            level: "info",
            icon: "info",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            languages: ["en"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-04-06T00:00:00.000Z",
          },
          {
            uuid: "announcement-id-c",
            level: "warning",
            icon: "warning",
            content: {
              title: "Incoming bitcoin fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            priority: 1,
            contextual: ["send"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-05-06T00:00:00.000Z",
            currencies: ["bitcoin"],
          },
        ];

        expect(filtered).toStrictEqual(expected);
      });
    });
    describe("with context.currencies = []", () => {
      const context = {
        language: "en",
        currencies: [],
        getDate: () => new Date(),
      };

      beforeEach(() => {
        announcements = localizeAnnouncements(rawAnnouncements, context);
      });

      it("should return only the announcements not scoped to any currency", () => {
        const filtered = filterAnnouncements(announcements, context);
        const expected = [
          {
            uuid: "announcement-id-b",
            level: "info",
            icon: "info",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            languages: ["en"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-04-06T00:00:00.000Z",
          },
        ];

        expect(filtered).toStrictEqual(expected);
      });
    });
  });

  describe("published_at filters", () => {
    beforeAll(() => {
      timemachine.config({
        dateString: "February 22, 2021 13:12:59",
      });
    });

    const context = {
      language: "en",
      currencies: ["bitcoin", "cosmos"],
      getDate: () => new Date(),
    };

    beforeEach(() => {
      announcements = localizeAnnouncements(rawAnnouncements, context);
    });

    afterEach(() => {
      timemachine.reset();
    });

    describe("with current date higher than publish date", () => {
      it(`should return all the article posted before `, () => {
        const filtered = filterAnnouncements(announcements, context);
        const expected = [
          {
            uuid: "announcement-id-a",
            level: "info",
            icon: "warning",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            published_at: "2019-09-29T00:00:00.000Z",
            expired_at: "2021-03-06T00:00:00.000Z",
            utm_campaign: "promo_feb2021",
            currencies: ["cosmos"],
          },
          {
            uuid: "announcement-id-b",
            level: "info",
            icon: "info",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            languages: ["en"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-04-06T00:00:00.000Z",
          },
          {
            uuid: "announcement-id-c",
            level: "warning",
            icon: "warning",
            content: {
              title: "Incoming bitcoin fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            priority: 1,
            contextual: ["send"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-05-06T00:00:00.000Z",
            currencies: ["bitcoin"],
          },
        ];

        expect(filtered).toStrictEqual(expected);
      });
    });

    describe("with current date lower than publish date", () => {
      beforeEach(() => {
        timemachine.config({
          dateString: "October 10, 2019 13:12:59",
        });
      });

      it("should return only the article posted before", () => {
        const filtered = filterAnnouncements(announcements, context);
        const expected = [
          {
            uuid: "announcement-id-a",
            level: "info",
            icon: "warning",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            published_at: "2019-09-29T00:00:00.000Z",
            expired_at: "2021-03-06T00:00:00.000Z",
            utm_campaign: "promo_feb2021",
            currencies: ["cosmos"],
          },
        ];

        expect(filtered).toStrictEqual(expected);
      });
    });

    afterAll(() => {
      timemachine.config({
        dateString: "February 22, 2021 13:12:59",
      });
    });
  });

  describe("expired_at filters", () => {
    beforeAll(() => {
      timemachine.config({
        dateString: "February 22, 2021 13:12:59",
      });
    });

    afterAll(() => {
      timemachine.config({
        dateString: "February 22, 2021 13:12:59",
      });
    });

    const context = {
      language: "en",
      currencies: ["bitcoin", "cosmos"],
      getDate: () => new Date(),
    };

    beforeEach(() => {
      announcements = localizeAnnouncements(rawAnnouncements, context);
    });

    describe("with current date lower than expiration date", () => {
      it("should return all non-expired announcements", () => {
        const filtered = filterAnnouncements(announcements, context);
        const expected = [
          {
            uuid: "announcement-id-a",
            level: "info",
            icon: "warning",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            published_at: "2019-09-29T00:00:00.000Z",
            expired_at: "2021-03-06T00:00:00.000Z",
            utm_campaign: "promo_feb2021",
            currencies: ["cosmos"],
          },
          {
            uuid: "announcement-id-b",
            level: "info",
            icon: "info",
            content: {
              title: "Incoming cosmos fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            contextual: [],
            languages: ["en"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-04-06T00:00:00.000Z",
          },
          {
            uuid: "announcement-id-c",
            level: "warning",
            icon: "warning",
            content: {
              title: "Incoming bitcoin fork",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
              link: {
                href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                label: "Click here for more information on upcoming fork",
              },
            },
            priority: 1,
            contextual: ["send"],
            published_at: "2019-10-31T00:00:00.000Z",
            expired_at: "2021-05-06T00:00:00.000Z",
            currencies: ["bitcoin"],
          },
        ];

        expect(filtered).toStrictEqual(expected);
      });
    });
    describe("with current date higher than expiration date", () => {
      beforeEach(() => {
        timemachine.config({
          dateString: "April 22, 2021 13:12:59",
        });

        it("should return only non-expired announcements", () => {
          const filtered = filterAnnouncements(announcements, context);
          const expected = [
            {
              uuid: "announcement-id-c",
              level: "warning",
              icon: "warning",
              content: {
                title: "Incoming bitcoin fork",
                text:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc nibh felis, pom id...",
                link: {
                  href: "https://ledger.com/there-is/an/incoming-cosmos-fork",
                  label: "Click here for more information on upcoming fork",
                },
              },
              priority: 1,
              contextual: ["send"],
              published_at: "2019-10-31T00:00:00.000Z",
              expired_at: "2021-05-06T00:00:00.000Z",
              currencies: ["bitcoin"],
            },
          ];

          expect(filtered).toStrictEqual(expected);
        });
      });
    });
  });
});
