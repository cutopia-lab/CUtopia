import { Link } from '@mui/material';
import clsx from 'clsx';
import { FC } from 'react';

import styles from '../../../styles/components/about/About.module.scss';
import Card from '../../atoms/Card';
import AboutSection from '../AboutSection';

const PrivacyTab: FC = () => (
  <Card className={clsx(styles.aboutCard, 'grid-auto-row')}>
    <AboutSection
      title="Privacy"
      labelClassName={clsx(styles.aboutTitle, 'subHeading')}
    >
      <p>
        {' '}
        We need your student id for verification purposes only. Reviews are
        being posted anonymously or with CUtopia username, but not student id.
        Thus, your student id is only used in sign-up and password recovery
        services.
      </p>
      <p>
        We will never share your personal data, such as your student id, with
        any third parties. However, your username might be collected through
        third party sites or services. Please read the details below.
      </p>
    </AboutSection>
    <AboutSection title="Crash Report">
      <p>
        We use services provided by{' '}
        <Link href="https://sentry.io/">Sentry</Link> for crash reporting. Your
        crash log together with your identifier (username) will be automatically
        send to us for troubleshooting.
      </p>
    </AboutSection>
    <AboutSection title="Analytics">
      <p>
        We use{' '}
        <Link href="https://analytics.google.com/">Google Analytics</Link> to
        analyze the usage. Activities such as page views, session duration will
        be collected anonymously.
      </p>
    </AboutSection>
  </Card>
);

export default PrivacyTab;
