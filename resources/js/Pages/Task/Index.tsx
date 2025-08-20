import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { TaskStatus } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { TasksTable } from './TasksTable';

interface Task {
    id: number;
    name: string;
    description: string | null;
    due_date: string | null;
    status: TaskStatus;
    image_path: string | undefined;
    createdBy: { name: string };
    task: { name: string };
    project: { name: string };
    updated_by: number;
    created_at: string;
    updated_at: string;
}

export interface TaskIndexProps {
    tasks: {
        data: Task[];
        meta: { links: any[] };
    };
    success?: string;

    queryParams: Record<string, string> | null;
}
export default function Index({
    // auth,
    tasks,
    success,
    queryParams = null,
}: TaskIndexProps) {
    useEffect(() => {
        if (success) toast.success(success);
    }, [success]);

    return (
        <div>
            <AuthenticatedLayout
                header={
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                            Tasks
                        </h2>
                        <Link
                            href={route('task.create')}
                            className="rounded bg-emerald-500 px-3 py-1 text-white shadow transition-all hover:bg-emerald-600"
                        >
                            Add new
                        </Link>
                    </div>
                }
            >
                <Head title="Tasks" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <TasksTable
                                    tasks={tasks}
                                    queryParams={queryParams}
                                    showProjectColumn={true}
                                    success={success}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
