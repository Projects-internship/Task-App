import { faker } from '@faker-js/faker';
import { DraggableLocation } from '@hello-pangea/dnd';

// Definirea locală a tipurilor, dacă nu mai ai fișierul types.ts
type KanbanTask = {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  assignees: {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }[];
  tags: string[]; // Modifică după cum este necesar
};

type KanbanColumn = {
  title: string;
  status: string;
  items: KanbanTask[];
};

type KanbanBoardData = Record<string, KanbanColumn>;

const reorder = (list: any[], startIndex: number, endIndex: number): any[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const reoderTasks = ({
  columns,
  source,
  destination,
}: {
  columns: KanbanBoardData;
  source: DraggableLocation;
  destination: DraggableLocation;
}) => {
  const current = columns[source.droppableId];
  const next = columns[destination.droppableId];
  const currentItems = [...current.items];
  const nextItems = [...next.items];
  const target = currentItems[source.index];

  // Moving to same list
  if (source.droppableId === destination.droppableId) {
    return {
      ...columns,
      [source.droppableId]: {
        ...columns[source.droppableId],
        items: reorder(currentItems, source.index, destination.index),
      },
    };
  }

  // Moving to different list
  // Remove from original
  currentItems.splice(source.index, 1);
  // Insert into next
  nextItems.splice(destination.index, 0, target);

  return {
    ...columns,
    [source.droppableId]: {
      ...columns[source.droppableId],
      items: currentItems,
    },
    [destination.droppableId]: {
      ...columns[destination.droppableId],
      items: nextItems,
    },
  };
};

function generateTasks(amount = 20): KanbanTask[] {
  const tags: string[] = ['App', 'Website', 'Design', 'Frontend']; // Modifică după cum este necesar
  return new Array(faker.datatype.number({ min: 1, max: amount })).fill(0).map(() => ({
    id: faker.datatype.uuid(),
    title: faker.lorem.sentence(),
    priority: 'medium',
    description: faker.lorem.lines(),
    assignees: new Array(faker.datatype.number({ min: 1, max: 3 })).fill(0).map(() => ({
      id: faker.datatype.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      avatar: faker.image.avatar(),
    })),
    tags: new Array(faker.datatype.number({ min: 1, max: tags.length - 1 })).fill(0).map(() => {
      return faker.helpers.arrayElement(tags);
    }),
  }));
}

export { generateTasks, reoderTasks, reorder };
