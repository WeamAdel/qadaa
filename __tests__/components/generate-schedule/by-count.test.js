import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import 'jest-axe/extend-expect';

import Form, { perPrayerMaxCount } from '../../../components/GenerateSchedule/ByCount/Form/Form';
import ByCount from '../../../components/GenerateSchedule/ByCount/ByCount';
import Prayer from '../../../types/Prayer';
import { addDownloadScheduleAssertions, addScheduleTableAssertions } from '../../utils/utils';

describe('Create schedule by prayers count', () => {
	it('Form is accessible', async () => {
		const { container } = render(<Form />);
		const results = await axe(container);

		expect(results).toHaveNoViolations();
	});

	it('Should show error message on empty prayers count', async () => {
		const { getByText, getByTestId } = render(<Form />);

		fireEvent.click(getByTestId('generate-form-submit'));

		await waitFor(() => {
			expect(getByText(/at least/i)).toBeInTheDocument();
		});
	});

	it('Should show error message if a prayer count exceeds the max limit', async () => {
		const { getByText, getByTestId } = render(<Form />);

		userEvent.type(getByTestId('prayer-fajr'), (perPrayerMaxCount + 1).toString());
		fireEvent.click(getByTestId('generate-form-submit'));

		await waitFor(() => {
			expect(getByText(/more than/i)).toBeInTheDocument();
		});
	});

	it('Should hide error message on valid prayers count', async () => {
		const { getByTestId, queryByTestId } = render(<Form />);

		fireEvent.click(getByTestId('generate-form-submit'));
		userEvent.type(getByTestId('prayer-fajr'), '5');

		await waitFor(() => {
			expect(queryByTestId(/at leats/i)).toBeNull();
		});

		userEvent.type(getByTestId('prayer-fajr'), (perPrayerMaxCount + 1).toString());
		userEvent.type(getByTestId('prayer-fajr'), perPrayerMaxCount.toString());

		await waitFor(() => {
			expect(queryByTestId(/less than/i)).toBeNull();
		});
	});

	it('Should show loading on form submit', async () => {
		const { getByTestId } = render(<ByCount />);

		userEvent.type(getByTestId('prayer-fajr'), '2');

		fireEvent.click(getByTestId('generate-form-submit'));

		await waitFor(() => {
			expect(getByTestId('schedule-loading')).toBeInTheDocument();
		});
	});

	it('Should generate schedule with download button', async () => {
		const { getByTestId, container } = render(<ByCount />);

		userEvent.type(getByTestId('prayer-' + Prayer.fajr), '1');
		userEvent.type(getByTestId('prayer-' + Prayer.dhuhr), '2');
		userEvent.type(getByTestId('prayer-' + Prayer.asr), '3');
		userEvent.type(getByTestId('prayer-' + Prayer.maghrib), '4');
		userEvent.type(getByTestId('prayer-' + Prayer.isha), '5');
		fireEvent.click(getByTestId('generate-form-submit'));

		await waitFor(
			() => {
				// Download modal
				addDownloadScheduleAssertions(getByTestId);

				// Created schedule
				const tablesWrapper = getByTestId('by-prayers-count-schedule-tables');
				expect(tablesWrapper).toBeInTheDocument();

				//One table with 15 prayers.
				expect(tablesWrapper.querySelector('tbody').childElementCount).toBe(15);

				//Testing 3rd and 11th prayers
				addScheduleTableAssertions(tablesWrapper.children[0], 'Prayers', 4, 4, Prayer.asr);
				addScheduleTableAssertions(tablesWrapper.children[0], 'Prayers', 11, 11, Prayer.isha);
			},
			{ timeout: 3000 }
		);
	});
});
