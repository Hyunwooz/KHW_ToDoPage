const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  // 기본 데이터 정의
  const statuses = [
    { name: '해야 할 일', color: 'blue' },
    { name: '진행 중', color: 'yellow' },
    { name: '보류', color: 'red' },
    { name: '완료됨', color: 'green' },
  ];

  // 기존 데이터 삭제
  await prisma.status.deleteMany();

  // 데이터 삽입
  await prisma.status.createMany({
    data: statuses,
  });

  console.log('✅ Init 데이터 설정 완료');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
