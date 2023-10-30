---
layout: post
title:  Standard Cell Delay Calculator
affiliation: Design and Techonology Platform, TSMC
summary: A fast propagation delay calculator for standard cells
thumbnail: /assets/img/TSMC-Logo.png
top_figure: 
keywords: DSPF, delay, graph theory, LDE, standard cells, EDA, transistors
usemathjax: true
visibility: true
category: research
period: Jun '22 - Jul '23
permalink: /research/delay_calculator.html
---

- toc 
{:toc}

Disclaimer: The tool is TSMC's proprietary and the author can only disclose part of the information.

# Background and Design Consideration
## The need for a fast delay estimation tool
As reinforcement-learning-based methods become more and more popular, the need for a fast scoring method emerges.
The time required for evaluating a circuit is directly related to the efficiency of the RL agent.

## Scope of this work
This tool is focused on standard cells, assuming the circuit including only PMOS, NMOS, and parasitic resistors/capacitors.

---
# System architecture

## Graph Traversal
Graph theory and graph algorithms are the centerpiece of this tool.
A standard cell is first divided into several stages (channel connected components), and the I/O pins in these stages make up of the nodes in the graph.
With edges modeled as electrical connections between pins, and edge weight being the propagation delay (either stage delay or RC delay) between two pins,
the worst case delay is essentially modeled as a longest path problem, which has the same complexity as the more well-known shortest path problem, 
and can be solved in `O(|V|+|E|)` time in a DAG using depth-first search.

## Channel Connected Component Divider
The algorithm for this part is inspired by [FROSTY: a fast hierarchy extractor for industrial CMOS circuits](https://ieeexplore.ieee.org/document/1257891).

## RC Delay Calculator (PRIMA)
The algorithm for this part is inspired by [Asymptotic waveform evaluation for timing analysis](https://ieeexplore.ieee.org/document/45867).

## LDE Estimator
Layout Dependent Effect (LDE) plays a critical role in advanced node.
The drain current of a transistor can vary up to 40% arising from LDE.

## Effective Resistance
The algorithm for this part is inspired by [Spectral Graph Theory Lecture 8 by Daniel A. Spielman](https://www.cs.yale.edu/homes/spielman/561/2012/lect08-12.pdf)

## Pre-characterized Lookup Table
The most time-consuming part in SPICE simulation is transient analysis.
In order to outperform simulators in computation time, we need another method to replace transient analysis.
In this tool, we perform a pre-characterization to study the relationship between DC performance and transient counterpart.
And we use a 2-dimensional (input slew and loading capacitance) lookup table to map DC current to its effective average current in transient analysis.

---

# Difficulties and Lessons Learned

## Impact of Shared Power/Ground Track
OD sharing is an ordinary phenomena in standard cells.
Under this circumstance, two transistors use the same metal track to drain current from power/ground.
If the two transistor are both switched on, the IR drop of the metal track is twice larger than those with only one active transistors.
As a result, the performance of a transistor is correlated with the state of its neighbor if they shares the same metal track to power/ground.

## Impact of Clock Skew

## Complexity of Transmission Gate

---

# Results and conclusion
This tool can achieve more than 0.9/1.0 of [ranking correlation coefficient](https://en.wikipedia.org/wiki/Spearman's_rank_correlation_coefficient),
while using less than 10% of computation time of compariable SPICE simulation.
Unfortunately the raw data is TSMC's confidential and cannot be disclosed.

---

# References
- Lei Yang and C.- J. R. Shi, "FROSTY: a fast hierarchy extractor for industrial CMOS circuits," ICCAD-2003. International Conference on Computer Aided Design (IEEE Cat. No.03CH37486), San Jose, CA, USA, 2003, pp. 741-746, doi: 10.1109/ICCAD.2003.159759. [[Link]](https://ieeexplore.ieee.org/document/1257891)
- L. T. Pillage and R. A. Rohrer, "Asymptotic waveform evaluation for timing analysis," in IEEE Transactions on Computer-Aided Design of Integrated Circuits and Systems, vol. 9, no. 4, pp. 352-366, April 1990, doi: 10.1109/43.45867. [[Link]](https://ieeexplore.ieee.org/document/45867)
- Daniel A. Spielman, "Effective Resistance" in Spectral Graph Theory, Lecture 8, September 24, 2012 [[Link]](https://www.cs.yale.edu/homes/spielman/561/2012/lect08-12.pdf)

