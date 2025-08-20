import { Pagination } from '@/Components/Pagination';
import TableHeading from '@/Components/TableHeading';
import TextInput from '@/Components/TextInput';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import React, { useEffect } from 'react';
import { toast } from 'sonner';

export interface User {
    id: number;
    name: string;
    description: string | null;
    due_date: string | null;
    email: string;
    image_path: string | undefined;
    createdBy: { name: string };
    updated_by: number;
    created_at: string;
    updated_at: string;
}

export interface UserIndexProps {
    auth: any;
    users: {
        data: User[];
        meta: { links: any[] };
    };
    queryParams: Record<string, string> | null;
    success: string;
}
export default function Index({
    auth,
    users,
    queryParams = null,
    success,
}: UserIndexProps) {
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

        router.get(route('user.index'), queryParams);
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

        router.get(route('user.index'), queryParams);
    };

    const handleUserDeletetion = (user: { id: number }) => {
        if (!window.confirm('Are you sure you want to delete this user?'))
            return;

        router.delete(route('user.destroy', user.id));
    };

    return (
        <div>
            <AuthenticatedLayout
                header={
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-200">
                            Create Users
                        </h2>
                        <Link
                            href={route('user.create')}
                            className="rounded bg-emerald-500 px-3 py-1 text-white shadow transition-all hover:bg-emerald-600"
                        >
                            Add new
                        </Link>
                    </div>
                }
            >
                <Head title="Users" />
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
                                                    name="email"
                                                    sort_field={
                                                        queryParams.sort_field
                                                    }
                                                    sort_direction={
                                                        queryParams.sort_direction
                                                    }
                                                >
                                                    Email
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
                                                <th className="cursor-pointer px-3 py-3">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <thead className="border-b-2 border-gray-500 bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                                            <tr className="text-nowrap">
                                                <th className="px-3 py-3"></th>
                                                <th className="px-3 py-3">
                                                    <TextInput
                                                        className="l"
                                                        placeholder="Username"
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
                                                        onKeyDown={(
                                                            e: React.KeyboardEvent<HTMLInputElement>,
                                                        ) =>
                                                            handleKeyPress(
                                                                'name',
                                                                e,
                                                            )
                                                        }
                                                    />
                                                </th>
                                                <th className="px-3 py-3">
                                                    <TextInput
                                                        className="l"
                                                        placeholder="User Email"
                                                        defaultValue={
                                                            queryParams.email
                                                        }
                                                        onBlur={(
                                                            // e: React.FocusEvent,
                                                            e,
                                                        ) =>
                                                            searchFieldChanged(
                                                                'email',
                                                                e.target.value,
                                                            )
                                                        }
                                                        onKeyDown={(
                                                            e: React.KeyboardEvent<HTMLInputElement>,
                                                        ) =>
                                                            handleKeyPress(
                                                                'email',
                                                                e,
                                                            )
                                                        }
                                                    />
                                                </th>
                                                <th className="px-3 py-3"></th>
                                                <th className="px-3 py-3"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.data.map((user) => (
                                                <tr
                                                    className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
                                                    key={user.id}
                                                >
                                                    <td className="px-3 py-2">
                                                        {user.id}
                                                    </td>
                                                    <th className="px-3 py-2 text-nowrap text-gray-100">
                                                        {user.name}
                                                    </th>
                                                    <td className="px-3 py-2">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-3 py-2 text-nowrap">
                                                        {user.created_at}
                                                    </td>
                                                    <th className="px-3 py-2 text-nowrap">
                                                        <Link
                                                            href={route(
                                                                'user.edit',
                                                                user.id,
                                                            )}
                                                            className="mx-1 font-medium text-blue-600 hover:underline dark:text-blue-500"
                                                        >
                                                            Edit
                                                        </Link>
                                                        <button
                                                            onClick={(e) =>
                                                                handleUserDeletetion(
                                                                    user,
                                                                )
                                                            }
                                                            // href={route(
                                                            //     'user.destroy',
                                                            //     user.id,
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
                                <Pagination links={users.meta.links} />
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </div>
    );
}
