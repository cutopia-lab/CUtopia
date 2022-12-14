import { useState, FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, IconButton, Menu, MenuItem, Tooltip } from '@mui/material';
import {
  ErrorOutline,
  ExpandMore,
  Favorite,
  FavoriteBorder,
} from '@mui/icons-material';
import { default as RouterLink } from 'next/link';
import { FiExternalLink } from 'react-icons/fi';
import clsx from 'clsx';
import { ReportCategory } from 'cutopia-types';

import { useLazyQuery } from '@apollo/client';
import styles from '../../styles/components/review/CourseCard.module.scss';
import ShowMoreOverlay from '../molecules/ShowMoreOverlay';
import Badge from '../atoms/Badge';
import { useView, useUser, viewStore } from '../../store';
import {
  COURSE_CARD_MAX_HEIGHT,
  CURRENT_TERM,
  plannerTerms,
} from '../../config';
import { CourseInfo } from '../../types';
import Link from '../molecules/Link';
import useMobileQuery from '../../hooks/useMobileQuery';
import Section from '../molecules/Section';
import SectionText from '../molecules/SectionText';
import If from '../atoms/If';
import { SWITCH_SECTION_QUERY } from '../../constants/queries';
import LoadingView from '../atoms/LoadingView';
import CourseSections from './CourseSections';
import GradeRow from './GradeRow';

type CourseInfoProps = {
  courseInfo: CourseInfo;
};

const makeBadges = (courseInfo: CourseInfo) => {
  let badges = [];
  // credits
  if (courseInfo.units)
    badges.push([`${parseInt(courseInfo.units, 10)} Credits`]);
  // academic gp
  if (courseInfo.academic_group) badges.push([courseInfo.academic_group]);
  // components
  if (Array.isArray(courseInfo.components)) {
    badges = badges.concat(courseInfo.components.map(item => item && [item]));
  } else if (typeof courseInfo.components === 'string') {
    badges = badges.concat(
      courseInfo.components.match(/[A-Z][a-z]+/g).map(item => item && [item])
    );
  }
  // assessments
  if (courseInfo.assessments) {
    badges = badges.concat(
      courseInfo.assessments.map(assessment => [
        assessment.name,
        parseInt(assessment.percentage, 10) || false,
      ])
    );
  }
  return badges;
};

const CourseBadgeRow: FC<CourseInfoProps> = ({ courseInfo }) => {
  if (!courseInfo?.units) return null;
  return (
    <div className="badges-row">
      {makeBadges(courseInfo).map(([k, v], i) => (
        <Badge index={i} text={k} value={v} key={k + v} />
      ))}
    </div>
  );
};

const CourseConcise: FC<CourseInfoProps> = ({ courseInfo }) => {
  const [term, setTerm] = useState(CURRENT_TERM);
  const [anchorEl, setAnchorEl] = useState(null);
  const [
    getSection,
    { data: courseSectionInfo, loading: courseSectionLoading },
  ] = useLazyQuery(SWITCH_SECTION_QUERY, {
    onError: viewStore.handleError,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-first',
  });
  const switchTerm = (term: string) => {
    getSection({
      variables: {
        courseId: courseInfo.courseId,
        term,
      },
    });
    setTerm(term);
  };
  const combinedCourseInfo = courseSectionInfo
    ? {
        ...courseInfo,
        ...courseSectionInfo.course,
      }
    : courseInfo;
  return (
    <>
      <If visible={courseInfo.requirements}>
        <SectionText
          className={styles.requirementSection}
          title="Requirements"
          caption={courseInfo.requirements}
        />
      </If>
      <If visible={courseInfo.rating}>
        <div className={styles.subHeadingContainer}>
          <RouterLink href={`/review/${courseInfo.courseId}`}>
            <a
              className={clsx(
                styles.reviewsLinkHeading,
                'subHeading center-row'
              )}
            >
              Reviews
              <FiExternalLink />
            </a>
          </RouterLink>
          <GradeRow
            rating={courseInfo.rating}
            concise
            style={clsx(styles.gradeRowConcise, styles.gradeRow)}
          />
        </div>
      </If>
      <Section title="Sections" subheading>
        <Button
          size="small"
          className={styles.termSwitchBtn}
          onClick={e => setAnchorEl(e.currentTarget)}
          endIcon={<ExpandMore />}
        >
          {term}
        </Button>
        <Menu
          id="course-terms-menu"
          className={styles.sortMenu}
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={() => setAnchorEl(null)}
        >
          {plannerTerms.map(t => (
            <MenuItem
              key={t}
              selected={t === term}
              onClick={e => {
                e.stopPropagation();
                switchTerm(t);
                setAnchorEl(null);
              }}
            >
              {t}
            </MenuItem>
          ))}
        </Menu>
        <LoadingView loading={courseSectionLoading}>
          <CourseSections courseInfo={combinedCourseInfo} />
        </LoadingView>
      </Section>
    </>
  );
};

const CourseDetails: FC<CourseInfoProps> = ({ courseInfo }) => (
  <>
    <If visible={courseInfo.requirements}>
      <SectionText title="requirements" caption={courseInfo.requirements} />
    </If>
    <Section title="Past Paper" subheading>
      <Link
        style={styles.courseLinkContainer}
        url={`https://julac.hosted.exlibrisgroup.com/primo-explore/search?query=any,contains,${courseInfo.courseId}&tab=default_tab&search_scope=Exam&sortby=date&vid=CUHK&lang=en_US`}
        label="Search on CUHK library"
      />
    </Section>
  </>
);

type CourseCardProps = {
  courseInfo: CourseInfo;
  concise?: boolean; // if concise, then it's for planner search result
  style?: string;
};

const CourseCard: FC<CourseCardProps> = ({ courseInfo, concise, style }) => {
  const [showMore, setShowMore] = useState(true);
  const [skipHeightCheck, setSkipHeightCheck] = useState(concise);
  const user = useUser();
  const isMobile = useMobileQuery();
  const view = useView();

  const isFavorited = user.favoriteCourses.some(
    course => course.courseId === courseInfo.courseId
  );

  return (
    <div
      className={clsx(
        styles.courseCard,
        'grid-auto-row',
        concise && styles.concise,
        !showMore && styles.retracted,
        style
      )}
      ref={ref => {
        // Wrap if courseCard is too long
        if (
          !skipHeightCheck &&
          ref &&
          ref.clientHeight >= COURSE_CARD_MAX_HEIGHT
        ) {
          setShowMore(false);
        }
      }}
    >
      <header className={styles.courseCardHeader}>
        <div className={clsx(styles.courseCardTitleContainer, 'column')}>
          <span className="center-row">
            <span className="title">{courseInfo.courseId}</span>
            <IconButton
              className={clsx(isFavorited && 'active')}
              onClick={() => user.toggleFavourite(courseInfo, isFavorited)}
              aria-label="favourite"
              size="small"
            >
              {isFavorited ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <Tooltip
              title="Report inaccurate information"
              placement="top"
              arrow
            >
              <IconButton
                onClick={() =>
                  view.setDialog({
                    key: 'reportIssues',
                    contentProps: {
                      reportCategory: ReportCategory.COURSE,
                      id: courseInfo.courseId,
                    },
                  })
                }
                aria-label="report"
                size="small"
              >
                <ErrorOutline />
              </IconButton>
            </Tooltip>
            <If visible={concise}>
              <Badge
                className="right"
                index={0}
                text={`${parseInt(courseInfo.units, 10)} credits`}
                value={null}
              />
            </If>
          </span>
          <span className="caption">{courseInfo.title}</span>
        </div>
        <If visible={courseInfo.rating && !concise && !isMobile}>
          <GradeRow rating={courseInfo.rating} style={styles.gradeRow} />
        </If>
      </header>
      <If
        visible={concise}
        elseNode={<CourseBadgeRow courseInfo={courseInfo} />}
      >
        <CourseConcise courseInfo={courseInfo} />
      </If>
      <If
        visible={
          courseInfo.rating &&
          isMobile && // for mobile display grades
          !concise
        }
      >
        <GradeRow
          rating={courseInfo.rating}
          style={clsx(styles.gradeRowConcise, styles.gradeRow)}
          concise
        />
      </If>
      {Boolean(courseInfo.description) && (
        <p className="caption description">{courseInfo.description}</p>
      )}
      <ShowMoreOverlay
        visible={!showMore}
        onShowMore={() => [setShowMore(true), setSkipHeightCheck(true)]}
      />
      {!concise && <CourseDetails courseInfo={courseInfo} />}
    </div>
  );
};

export default observer(CourseCard);
