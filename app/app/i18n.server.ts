import {Language, RemixI18Next} from 'remix-i18next'

export const i18n = new RemixI18Next(
  {
    getTranslations(
      namespace: 'common' | 'feedback',
      locale: 'ru' | 'en',
    ): Promise<Language> {
      const translations: Record<
        'en' | 'ru',
        Record<'common' | 'feedback', Language>
      > = {
        ru: {
          common: {
            navbar: {
              backMenu: 'Go back to previous menu options',
              drawer: {
                close: 'Закрыть',
              },
              links: {
                services: {
                  name: 'Услуги',
                },
                test: {
                  name: 'test',
                  children: {
                    test1: {
                      name: 'test1',
                      description: 'Test text',
                    },
                    test2: {
                      name: 'test2',
                      children: {
                        test3: {
                          name: 'test3',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          feedback: {
            form: {
              email: 'Ваш Email',
              name: 'Ваше имя',
              aboutProject: 'Расскажите нам о Вашем проекте',
              interestedIn: 'Меня интересует...',
              costs: 'Бюджет проекта (РУБ)',
            },
          },
        },
        en: {
          common: {
            navbar: {
              backMenu: 'Go back to previous menu options',
              drawer: {
                close: 'Close',
              },
              links: {
                services: {
                  name: 'Services',
                },
                test: {
                  name: 'test',
                  children: {
                    test1: {
                      name: 'test1',
                      description: 'Test text',
                    },
                    test2: {
                      name: 'test2',
                      children: {
                        test3: {
                          name: 'test3',
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          feedback: {
            form: {
              email: 'Your Email',
              name: 'Your name',
              aboutProject: 'Tell us about Your project',
              interestedIn: "I'm interested in...",
              costs: 'Project budget (RUB)',
            },
          },
        },
      }

      return Promise.resolve(translations[locale][namespace])
    },
  },
  {
    fallbackLng: 'ru',
    supportedLanguages: ['en', 'ru'],
  },
)
