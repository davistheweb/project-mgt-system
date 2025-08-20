import {
    TASK_PRIORITY_CLASS_MAP,
    TASK_PRIORITY_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
    TASK_STATUS_TEXT_MAP,
} from '@/data';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TaskPriority, TaskStatus } from '@/types';
import { Head, Link } from '@inertiajs/react';

export interface Task {
    id: number;
    name: string;
    description: string | null;
    due_date: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    image_path: string | null;
    createdBy: { name: string };
    updatedBy: { name: string; email: string };
    project: { id: string; name: string };
    created_at: string;
    updated_at: string;
    assignedUser: { name: string };
}

interface ITaskDetails {
    task: Task;
}

const Show = ({ task }: ITaskDetails) => {
    console.table(task);

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                        {`Tasks: "${task.name}"`}
                    </h2>
                    <Link
                        href={route('task.edit', task.id)}
                        className="rounded bg-emerald-500 px-3 py-1 text-white shadow transition-all hover:bg-emerald-600"
                    >
                        Edit
                    </Link>
                </div>
            }
        >
            <Head title={`Tasks "${task.name}"`} />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div>
                            <img
                                src={
                                    task.image_path ||
                                    'https://placehold.co/60x40?text=no_img'
                                }
                                alt=""
                                onError={(
                                    e: React.SyntheticEvent<HTMLImageElement>,
                                ) =>
                                    (e.currentTarget.src =
                                        'https://placehold.co/60x40?text=no_img')
                                }
                                className="h-64 w-full object-cover"
                            />
                        </div>
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <div className="mt-2 grid grid-cols-2 gap-1">
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Task ID
                                        </label>
                                        <p className="mt-1">{task.id}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Task Name
                                        </label>
                                        <p className="mt-1">{task.name}</p>
                                    </div>

                                    <div className="mt-4">
                                        <label
                                            htmlFor=""
                                            className="text-lg font-bold"
                                        >
                                            Task Status
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={`rounded px-1.5 py-1 text-center text-[10px] text-wrap text-white select-none md:text-sm ${TASK_STATUS_CLASS_MAP[task.status]}`}
                                            >
                                                {
                                                    TASK_STATUS_TEXT_MAP[
                                                        task.status
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label
                                            htmlFor=""
                                            className="text-lg font-bold"
                                        >
                                            Task Priority
                                        </label>
                                        <p className="mt-1">
                                            <span
                                                className={`rounded px-1.5 py-1 text-center text-[10px] text-wrap text-white select-none md:text-sm ${TASK_PRIORITY_CLASS_MAP[task.priority]}`}
                                            >
                                                {
                                                    TASK_PRIORITY_TEXT_MAP[
                                                        task.priority
                                                    ]
                                                }
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Created By
                                        </label>
                                        <p className="mt-1">
                                            {task.createdBy.name}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <label className="text-lg font-bold">
                                            Due Date
                                        </label>
                                        <p className="mt-1">{task.due_date}</p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Create Date
                                        </label>
                                        <p className="mt-1">
                                            {task.created_at}
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Updated By
                                        </label>
                                        <p className="mt-1">
                                            {task.updatedBy.name}{' '}
                                            <span className="font-bold">
                                                ({task.updatedBy.email})
                                            </span>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Project
                                        </label>
                                        <p className="mt-1">
                                            <Link
                                                href={route(
                                                    'project.show',
                                                    task.project.id,
                                                )}
                                                className="hover:underline"
                                            >
                                                {task.project.name}
                                            </Link>
                                        </p>
                                    </div>
                                    <div className="mt-4">
                                        <label className="text-lg font-bold">
                                            Assigned User
                                        </label>
                                        <p className="mt-1">
                                            {task.assignedUser?.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="text-lg font-bold">
                                    Task Description
                                </label>
                                <p className="mt-1">{task.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};
export default Show;
