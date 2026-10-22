import Breadcrumbs from '$stylist/dialog/component/molecule/breadcrumbs/index.svelte';
import type { RecipeBreadcrumbs } from '$stylist/dialog/interface/recipe/breadcrumbs';
import type { ContractStory } from '$stylist/html/interface/contract/story';

/** Breadcrumb trail; index.story.svelte follows onNavigate to move the active crumb. */
export default {
	component: Breadcrumbs,
	title: 'Breadcrumbs',
	description: 'Breadcrumb trail with hover dropdown transitions.',
	args: {
		activeId: 'breadcrumb-dropdown-node',
		crumbs: [
			{
				id: 'workspace',
				label: 'Workspace',
				href: '/dashboard',
				dropdownItems: [
					{
						id: 'workspace-library',
						label: 'Library',
						targetId: 'library',
						href: '/library',
						description: 'Jump to the library root'
					},
					{
						id: 'workspace-dashboard',
						label: 'Dashboard',
						targetId: 'workspace',
						href: '/dashboard',
						description: 'Return to the workspace home'
					}
				]
			},
			{
				id: 'library',
				label: 'Library',
				parentId: 'workspace',
				href: '/library',
				dropdownItems: [
					{
						id: 'library-navigation',
						label: 'Navigation',
						targetId: 'navigation',
						href: '/navigation',
						description: 'Open the navigation domain'
					},
					{
						id: 'library-layout',
						label: 'Layout',
						targetId: 'layout',
						href: '/layout',
						description: 'Open layout patterns'
					},
					{
						id: 'library-themes',
						label: 'Themes',
						targetId: 'themes',
						href: '/themes',
						description: 'Open theme presets'
					}
				]
			},
			{
				id: 'navigation',
				label: 'Navigation',
				parentId: 'library',
				href: '/navigation',
				dropdownItems: [
					{
						id: 'navigation-breadcrumbs',
						label: 'Breadcrumbs',
						targetId: 'breadcrumbs-node',
						href: '/navigation#breadcrumbs-lab',
						description: 'Inspect the breadcrumb family'
					},
					{
						id: 'navigation-pagination',
						label: 'Pagination',
						targetId: 'pagination-node',
						href: '/navigation#coverage',
						description: 'Jump to pagination coverage'
					},
					{
						id: 'navigation-sidebar',
						label: 'Sidebar',
						targetId: 'sidebar-node',
						href: '/navigation#coverage',
						description: 'Jump to sidebar coverage'
					}
				]
			},
			{
				id: 'breadcrumbs-node',
				label: 'Breadcrumbs',
				parentId: 'navigation',
				href: '/navigation#breadcrumbs-lab',
				dropdownItems: [
					{
						id: 'breadcrumbs-link',
						label: 'BreadcrumbLink',
						targetId: 'breadcrumb-link-node',
						href: '/navigation#atoms',
						description: 'Open the clickable crumb atom'
					},
					{
						id: 'breadcrumbs-separator',
						label: 'BreadcrumbSeparator',
						targetId: 'breadcrumb-separator-node',
						href: '/navigation#atoms',
						description: 'Open the separator atom'
					},
					{
						id: 'breadcrumbs-dropdown',
						label: 'BreadcrumbDropdown',
						targetId: 'breadcrumb-dropdown-node',
						href: '/navigation#breadcrumbs-lab',
						description: 'Open the hover dropdown atom'
					}
				]
			},
			{
				id: 'breadcrumb-link-node',
				label: 'BreadcrumbLink',
				parentId: 'breadcrumbs-node',
				href: '/navigation#atoms'
			},
			{
				id: 'breadcrumb-separator-node',
				label: 'BreadcrumbSeparator',
				parentId: 'breadcrumbs-node',
				href: '/navigation#atoms'
			},
			{
				id: 'breadcrumb-dropdown-node',
				label: 'BreadcrumbDropdown',
				parentId: 'breadcrumbs-node',
				href: '/navigation#breadcrumbs-lab'
			},
			{
				id: 'pagination-node',
				label: 'Pagination',
				parentId: 'navigation',
				href: '/navigation#coverage'
			},
			{
				id: 'sidebar-node',
				label: 'Sidebar',
				parentId: 'navigation',
				href: '/navigation#coverage'
			},
			{
				id: 'layout',
				label: 'Layout',
				parentId: 'library',
				href: '/layout'
			},
			{
				id: 'themes',
				label: 'Themes',
				parentId: 'library',
				href: '/themes'
			}
		]
	},
	controls: {
		activeId: {
			type: 'select',
			options: [
				'workspace',
				'library',
				'navigation',
				'breadcrumbs-node',
				'breadcrumb-link-node',
				'breadcrumb-separator-node',
				'breadcrumb-dropdown-node',
				'pagination-node',
				'sidebar-node',
				'layout',
				'themes'
			]
		}
	}
} satisfies ContractStory<RecipeBreadcrumbs>;
