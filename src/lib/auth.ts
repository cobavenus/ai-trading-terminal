// Временная настройка аутентификации для локальной разработки
// В production режиме нужно настроить NextAuth с Supabase/Prisma

export const authOptions = {
  providers: [],
  pages: {
    signIn: '/auth/signin',
  },
};

