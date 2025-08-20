import { Pagination } from '@/Components/Pagination';
import SelectInput from '@/Components/SelectInput';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from '@/data';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ProjectStatus } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

export interface Project {
    id: number;
    name: string;
    description: string | null;
    due_date: string | null;
    status: ProjectStatus;
    image_path: string | undefined;
    createdBy: { name: string };
    updated_by: number;
    created_at: string;
    updated_at: string;
}

export interface ProjectIndexProps {
    auth: any;
    projects: {
        data: Project[];
        meta: { links: any[] };
    };
    queryParams: Record<string, string> | null;
    success: string;
}
export default function Index({
    auth,
    projects,
    queryParams = null,
    success,
}: ProjectIndexProps) {
    queryParams = queryParams || {};

    useEffect(() => {
        if (success) {
            console.log(success);

            toast.success(success);
        }
    }, [success]);

    const searchFieldChanged = (name: string, value: string) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('project.index'), queryParams);
    };

    const handleKeyPress = (
        name: string,
        e: React.KeyboardEvent<HTMLInputElement>,
    ) => {
        if (e.key !== 'Enter') return;

        searchFieldChanged(name, e?.currentTarget?.value);
    };

    const sortChanged = (name: string) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }

        router.get(route('project.index'), queryParams);
    };

    const handleProjectDeletetion = (project: { id: number }) => {
        if (!window.confirm('Are you sure you want to delete this project?'))
            return;

        router.delete(route('project.destroy', project.id));
    };

    return (
        <div>
            <AuthenticatedLayout
                header={
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                            Projects
                        </h2>
                        <Link
                            href={route('project.create')}
                            className="rounded bg-emerald-500 px-3 py-1 text-white shadow transition-all hover:bg-emerald-600"
                        >
                            Add new
                        </Link>
                    </div>
                }
            >
                <Head title="Projects" />
                <div className="py-12">
                    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                            <div className="p-6 text-gray-900 dark:text-gray-100">
                                <div className="overflow-auto">
                                    <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                                        <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="text-nowrap">
                                                <TableHeading
                                                    name="id"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                    sortChanged={sortChanged}
                                                >
                                                    ID
                                                </TableHeading>
                                                <th className="cursor-pointer px-3 py-3">
                                                    Image
                                                </th>
                                                <TableHeading
                                                    name="name"
                                                    sortChanged={sortChanged}
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                >
                                                    Name
                                                </TableHeading>
                                                <TableHeading
                                                    sortChanged={sortChanged}
                                                    name="status"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                >
                                                    Status
                                                </TableHeading>
                                                <TableHeading
                                                    sortChanged={sortChanged}
                                                    name="created_at"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                >
                                                    Create Date
                                                </TableHeading>
                                                <TableHeading
                                                    sortChanged={sortChanged}
                                                    name="due_date"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                >
                                                    Due Date
                                                </TableHeading>
                                                <th className="cursor-pointer px-3 py-3">
                                                    Created By
                                                </th>
                                                <th className="cursor-pointer px-3 py-3">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="text-nowrap">
                                                <th className="px-3 py-3"></th>
                                                <th className="px-3 py-3"></th>
                                                <th className="px-3 py-3">
                                                    <TextInput
                                                        className="l"
                                                        placeholder="Project Name"
                                                        defaultValue={
                                                            queryParams.name
                                                        }
                                                        onBlur={(
                                                            // e: React.FocusEvent,
                                                            e,
                                                        ) =>
                                                            searchFieldChanged(
                                                                'name',
                                                                e.target.value,
                                                            )
                                                        }
                                                        onKeyDown={(e) =>
                                                            handleKeyPress(
                                                                'name',
                                                                e,
                                                            )
                                                        }
                                                    />
                                                </th>
                                                <th className="px-3 py-3">
                                                    <SelectInput
                                                        className="w-full"
                                                        defaultValue={
                                                            queryParams.status
                                                        }
                                                        onChange={(e) =>
                                                            searchFieldChanged(
                                                                'status',
                                                                e.target.value,
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Select Status
                                                        </option>
                                                        <option value="pending">
                                                            Pending
                                                        </option>
                                                        <option value="in_progress">
                                                            In Progress
                                                        </option>
                                                        <option value="completed">
                                                            Completed
                                                        </option>
                                                    </SelectInput>
                                                </th>
                                                <th className="px-3 py-3"></th>
                                                <th className="px-3 py-3"></th>
                                                <th className="px-3 py-3"></th>
                                                <th className="px-3 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {projects.data.map((project) => (
                                                <tr
                                                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                                    key={project.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {project.id}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        <img
                                                            src={
                                                                project.image_path ||
                                                                'https://placehold.co/60x40?text=no_img'
                                                            }
                                                            alt="project_img"
                                                            className="h-[40px] w-[60px]"
                                                        />
                                                    </td>
                                                    <th className="px-3 py-2 text-nowrap text-gray-100 hover:underline">
                                                        <Link
                                                            href={route(
                                                                'project.show',
                                                                project.id,
                                                            )}
                                                        >
                                                            {`${project.name.length > 25 ? `${project.name.slice(0, 25)}...` : `${project.name}`}`}
                                                        </Link>
                                                    </th>
                                                    <td className="px-3 py-2">
                                                        <span
                                                            className={`rounded px-1.5 py-1 text-center text-[10px] text-wrap text-white select-none md:text-sm ${PROJECT_STATUS_CLASS_MAP[project.status]}`}
                                                        >
                                                            {
                                                                PROJECT_STATUS_TEXT_MAP[
                                                                    project
                                                                        .status
                                                                ]
                                                            }
                                                        </span>
                                                    </td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        {project.created_at}
                                                    </td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        {project.due_date}
                                                    </td>
                                                    <td className="px-3 py-2">
                                                        {project.createdBy.name}
                                                    </td>
                                                    <th className="px-3 py-2 text-nowrap">
                                                        <Link
                                                            href={route(
                                                                'project.edit',
                                                                project.id,
                                                            )}
                                                            className="mx-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={(e) =>
                                                                handleProjectDeletetion(
                                                                    project,
                                                                )
                                                            }
                                                            // href={route(
                                                            //     'project.destroy',
                                                            //     project.id,
                                                            // )}
                                                            className="mx-1 font-medium text-red-600 hover:underline dark:text-red-500"
                                                        >
                                                            Delete
                                                        </button>
                                                    </th>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <Pagination links={projects.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
