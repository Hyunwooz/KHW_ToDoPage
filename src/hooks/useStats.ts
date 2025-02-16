import { useStatusStore } from '@/store/useStatusStore';
import { Stat } from '@/shared/types/stat';

export const useStats = () => {
  const { getActiveBoards } = useStatusStore();
  const activeBoards = getActiveBoards();

  const totalBoards = activeBoards.flatMap((status) => status.boards).length;
  const allTodos = activeBoards
    .flatMap((status) => status.boards)
    .flatMap((board) => board.todos);

  const stats: Stat[] = [
    {
      label: '전체 보드',
      value: `${totalBoards}개`,
      description: '현재 활성화된 보드의 총 개수',
    },
    {
      label: '진행률',
      value: `${
        totalBoards === 0
          ? 0
          : Math.round(
              ((activeBoards.find((s) => s.statusNo === 4)?.boards.length ||
                0) /
                totalBoards) *
                100,
            )
      }%`,
      description: '전체 대비 완료된 보드의 비율',
    },
    {
      label: '완료된 할 일',
      value: `${allTodos.filter((todo) => todo.isCompleted).length}/${
        allTodos.length
      }`,
      description: '전체 할 일 중 완료된 수',
    },
  ];

  const getStatusStats = () => ({
    title: '상태별 통계',
    stats: activeBoards.map((status) => ({
      label: status.name,
      value: status.boards.length,
      description: `${status.name} 상태의 보드 수`,
    })),
  });

  const getProductivityStats = () => ({
    title: '생산성 통계',
    stats: [
      {
        label: '전체 보드',
        value: activeBoards.flatMap((status) => status.boards).length,
        description: '현재 활성화된 보드의 총 개수',
      },
      {
        label: '진행률',
        value: `${Math.round(
          ((activeBoards.find((s) => s.statusNo === 4)?.boards.length || 0) /
            activeBoards.flatMap((s) => s.boards).length) *
            100,
        )}%`,
        description: '전체 대비 완료된 보드의 비율',
      },
      {
        label: '진행 중인 작업',
        value:
          activeBoards.find((status) => status.statusNo === 2)?.boards.length ||
          0,
        description: '현재 진행 중인 보드의 수',
      },
      {
        label: '보류 중인 작업',
        value:
          activeBoards.find((status) => status.statusNo === 3)?.boards.length ||
          0,
        description: '보류 중인 보드의 수',
      },
    ],
  });

  const getTodoStats = () => ({
    title: '할 일 통계',
    stats: [
      {
        label: '전체 할 일',
        value: allTodos.length,
        description: '모든 보드의 전체 할 일 수',
      },
      {
        label: '완료된 할 일',
        value: `${allTodos.filter((todo) => todo.isCompleted).length}/${allTodos.length}`,
        description: '전체 할 일 중 완료된 수',
      },
      {
        label: '할 일 없는 보드',
        value: activeBoards
          .flatMap((status) => status.boards)
          .filter((board) => board.todos.length === 0).length,
        description: '할 일이 없는 보드의 수',
      },
      {
        label: '평균 할 일',
        value: (
          allTodos.length / activeBoards.flatMap((s) => s.boards).length
        ).toFixed(1),
        description: '보드 당 평균 할 일 수',
      },
    ],
  });

  return {
    stats,
    statSections: [getStatusStats(), getProductivityStats(), getTodoStats()],
  };
};
