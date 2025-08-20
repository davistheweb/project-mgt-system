import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/data';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ProjectStatus } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { TaskIndexProps } from '../Task/Index';
import { TasksTable } from '../Task/TasksTable';

export interface Project {
    id: number;
    name: string;
    description: string | null;
    due_date: string | null;
    status: ProjectStatus;
    image_path: string | null;
    createdBy: { name: string };
    updatedBy: { name: string; email: string };
    created_at: string;
    updated_at: string;
}

interface IProjectDetails {
    project: Project;
}

const Show = ({
    success,
    project,
    tasks,
    queryParams,
}: IProjectDetails & TaskIndexProps) => (
    <AuthenticatedLayout
        header={
            <div className="flex items-center justify-between">
                <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                    {`Projects "${project.name}"`}
                </h2>
                <Link
                    href={route('project.edit', project.id)}
                    className="rounded bg-emerald-500 px-3 py-1 text-white shadow transition-all hover:bg-emerald-600"
                >
                    Edit
                </Link>
            </div>
        }
    >
        <Head title={`Projects "${project.name}"`} />
        <div className="py-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div>
                        <img
                            src={
                                project.image_path ||
                                'https://placehold.co/60x40?text=no_img'
                            }
                            onError={(
                                e: React.SyntheticEvent<HTMLImageElement>,
                            ) =>
                                (e.currentTarget.src =
                                    'https://placehold.co/60x40?text=no_img')
                            }
                            alt=""
                            className="h-64 w-full object-cover"
                        />
                    </div>
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <div className="mt-2 grid grid-cols-2 gap-1">
                            <div>
                                <div>
                                    <label className="text-lg font-bold">
                                        Project ID
                                    </label>
                                    <p className="mt-1">{project.id}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Project Name
                                    </label>
                                    <p className="mt-1">{project.name}</p>
                                </div>

                                <div className="mt-4">
                                    <label
                                        htmlFor=""
                                        className="text-lg font-bold"
                                    >
                                        Project Status
                                    </label>
                                    <p className="mt-1">
                                        <span
                                            className={`rounded px-1.5 py-1 text-center text-[10px] text-wrap text-white select-none md:text-sm ${PROJECT_STATUS_CLASS_MAP[project.status]}`}
                                        >
                                            {
                                                PROJECT_STATUS_TEXT_MAP[
                                                    project.status
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
                                        {project.createdBy.name}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <label className="text-lg font-bold">
                                        Due Date
                                    </label>
                                    <p className="mt-1">{project.due_date}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Create Date
                                    </label>
                                    <p className="mt-1">{project.created_at}</p>
                                </div>
                                <div className="mt-4">
                                    <label className="text-lg font-bold">
                                        Updated By
                                    </label>
                                    <p className="mt-1">
                                        {project.updatedBy.name}{' '}
                                        <span className="font-bold">
                                            ({project.updatedBy.email})
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="text-lg font-bold">
                                Project Description
                            </label>
                            <p className="mt-1">{project.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="pb-12">
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                    <div className="p-6 text-gray-900 dark:text-gray-100">
                        <TasksTable
                            tasks={tasks}
                            queryParams={queryParams}
                            showProjectColumn={false}
                            success={success}
                        />
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
);
export default Show;
