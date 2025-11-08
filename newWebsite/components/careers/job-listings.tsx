"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Container } from "@/components/container";
import { Badge } from "@/components/badge";
import { SectionHeading } from "@/components/seciton-heading";
import { JobCard } from "@/components/careers/job-card";
import { careers, Department } from "@/constants/careers";

export const JobListings = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null,
  );

  const departments = [
    { value: null, label: "All Positions" },
    { value: Department.ENGINEERING, label: "Engineering" },
    { value: Department.DESIGN, label: "Design" },
    { value: Department.INTERNSHIPS, label: "Internships" },
  ];

  const filteredCareers = selectedDepartment
    ? careers.filter((career) => career.department === selectedDepartment)
    : careers;

  return (
    <Container className="border-divide border-x py-20">
      <div className="px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <Badge text="Open Positions" />
          <SectionHeading className="mt-4">
            Find Your Next Role
          </SectionHeading>
          <p className="mx-auto mt-6 max-w-2xl text-neutral-600 dark:text-neutral-400">
            We're looking for talented individuals to join our team. Explore our
            open positions below.
          </p>
        </div>

        {/* Department Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {departments.map((dept, index) => (
            <motion.button
              key={dept.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDepartment(dept.value)}
              className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
                selectedDepartment === dept.value
                  ? "bg-brand text-white shadow-lg"
                  : "border-divide border bg-white text-neutral-700 hover:border-neutral-400 dark:bg-neutral-900 dark:text-neutral-300"
              }`}
            >
              {dept.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Job Count */}
        <motion.div
          key={selectedDepartment}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-center text-sm text-neutral-600 dark:text-neutral-400"
        >
          Showing {filteredCareers.length}{" "}
          {filteredCareers.length === 1 ? "position" : "positions"}
        </motion.div>

        {/* Job Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDepartment || "all"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredCareers.map((career, index) => (
              <JobCard
                key={career.id}
                title={career.title}
                department={career.department}
                location={career.location}
                type={career.type}
                shortDescription={career.shortDescription}
                requirements={career.requirements}
                delay={index * 0.1}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-20 text-center text-neutral-600 dark:text-neutral-400"
          >
            <p className="text-lg">No positions found in this category.</p>
            <p className="mt-2 text-sm">Try selecting a different department.</p>
          </motion.div>
        )}
      </div>
    </Container>
  );
};
